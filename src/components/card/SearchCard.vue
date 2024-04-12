<script setup>
import { useBasketStore } from "@/stores/basketStore";


const basketStore = useBasketStore()

const props = defineProps({
  info: {
    type: Object,
  },
});

</script>

<template>
  <div class="products__card">
    <RouterLink :to="'/productsSingle/' + info?.id">
      <img class="products__card-image" :src="info?.thumbnail" alt="">
    </RouterLink>
    
    <h3 class="products__card-title">{{ info?.title }}</h3>
    <div class="products__card-info">
      <p class="products__card-price">${{ info?.price }}</p>
      <button class="products__card-btn" @click="basketStore.addToBasket(info?.id)">Buy</button>
      
    </div>
  </div>
</template>