<script setup>
import CartIcon from "@/components/icons/CartIcon.vue";
import { useBasketStore } from "@/stores/basketStore";
import { computed } from "vue";

const basketStore = useBasketStore()

function count(item) {
    if (item.count == 1) {
        basketStore.dellBasket(item.id)
    } else {
        item.count--
    }
    basketStore.totalSum -= item.price;
    basketStore.basketAmount--
}
function count2(item) {
    item.count++
    basketStore.totalSum += item.price;
    basketStore.basketAmount++
}

basketStore.productsAmount()

const test = computed(() => basketStore.basket.reduce((acc, item) => acc+= item.totalSum, 0))

</script>



<template>
    <section class="basket">
        <div class="container">
            <div class="basket__titles">
                <div class="basket__wrapper1">
                    <RouterLink to="/">
                        <img class="basket__wrapper1-image"
                            src="https://static-00.iconduck.com/assets.00/arrow-left-icon-2048x1433-le08mlmd.png"
                            alt="">
                    </RouterLink>
                    <h2 class="basket__wrapper1-title">Your Basket</h2>
                </div>
                <h3 class="basket__totalSum" >Total: <pre>{{ test }}</pre>$</h3>
            </div>
            <div class="basket__wrapper2" v-for="item in basketStore.basket">
                <div class="basket__image">
                    <img class="basket__img" :src="item.thumbnail" alt="">
                </div>
                <div class="basket__items">
                    <div class="basket__info">
                        <h3 class="basket__info-title">{{ item.title }}</h3>
                        <p class="basket__info-desc">{{ item.description }}</p>
                    </div>
                    <div class="basket__counter">
                        <button class="basket__counter-btn" @click="count(item)">-</button>
                        <span class="basket__counter-num">{{ item.count }}</span>
                        <button class="basket__counter-btn" @click="count2(item)">+</button>
                    </div>
                    <div class="basket__item">
                        <CartIcon class="basket__item-icon" @click="basketStore.dellBasket(item.id, item.totalSum, item.count)" />
                        <p class="basket__item-price">{{ item.totalSum }}$</p>
                    </div>
                </div>
            </div>
            <div class="basket__button" v-show="basketStore.basket.length > 0">
                <RouterLink to="/contacts" class="basket__btn">Contacts and Buy</RouterLink>
            </div>
        </div>
    </section>
</template>
