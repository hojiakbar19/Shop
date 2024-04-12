<script setup>
import CartIcon from "../icons/NavCartIcon.vue";
import BurgerIcon from "../icons/NavBurgerIcon.vue";
import { ref } from "vue";
import { useBasketStore } from "@/stores/basketStore";


const basketStore = useBasketStore()

const pages = [
{
        path: "/",
        name: "Home"
    },
    {
        path: "/category",
        name: "Categories"
    },
    {
        path: "/discounts",
        name: "Discounts"
    },
    {
        path: "/contacts",
        name: "Contacts"
    },
]

const menuToggler = ref(false)

const cartCount = ref(1)



</script>

<template>
    <div class="nav">
        <div class="container">
            <div class="nav__logo">
                <RouterLink to="/">
                    <img src="@/assets/images/navbar-logo.svg" alt="">
                </RouterLink>
            </div>
            <div class="nav__menu" :class="{'active': menuToggler}">
                <ul class="nav__list">
                    <li v-for="item in pages" :key="item.name">
                        <RouterLink :to="item.path" class="nav__link" @click="menuToggler = false">{{ item.name }}</RouterLink>
                    </li>
                </ul>
            </div>
            <div class="nav__item">
                <div class="nav__cart">
                    <RouterLink to="/basket" class="nav__cart-link "  @click="menuToggler = false">
                        <CartIcon class="nav__cart-icon" />
                        <span class="nav__cart-item " :class="cartCount > 0 ? 'active' : '' " v-if="basketStore.basketAmount > 0">{{ basketStore.basketAmount }}</span>
                    </RouterLink>
                </div>
                <div class="nav__burger"  @click="menuToggler = !menuToggler">
                    <BurgerIcon class="nav__burger-icon" />
                </div>
            </div>
        </div>
    </div>
</template>

