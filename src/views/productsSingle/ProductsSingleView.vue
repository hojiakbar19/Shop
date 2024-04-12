<script setup>
import { useProductsSingleStore } from '@/stores/productsSingleStore';
import { useRoute } from 'vue-router';
import { useBasketStore } from '@/stores/basketStore';

const basketStore = useBasketStore()


import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';

const modules = [EffectCoverflow, Pagination, Navigation]

const coverflowEffect = {
  rotate: 50,
  slideShadows: true
}

const breakpoints = {
  1024: {
    slidesPerView: 3,
    spacebetween: 50,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 40
  }
}

const pagination = {
  clickable: true
}


const route = useRoute()

const productsSingleStore = useProductsSingleStore()
productsSingleStore.getFetchSingleProducts(route.params.id)


</script>

<template>
  <section class="productsingle">

    <div class="productsingle__left-section">
      <swiper 
      
      class="swiper__images" 
      :slides-per-view="1" 
      :space-between="50" 
      :pagination="pagination" 
      :modules="modules"
      :breakpoints="breakpoints" 
      :coverflowEffect="coverflowEffect"
      :grabCursor="true"
      :centeredSlides="true"
      :navigation="true"
      >
        <swiper-slide class="swiperSlide">
          <img class="productsingle__img" :src="productsSingleStore.productsSingle?.thumbnail" alt="">
        </swiper-slide>
        <swiper-slide v-for="item in productsSingleStore.productsSingle?.images" :key="item">
          <img :src="item" alt="">
        </swiper-slide>
      </swiper>

    </div>
    <div class="productsingle__info">
      <h2 class="productsingle__title">Name: {{ productsSingleStore.productsSingle?.title }}</h2>
      <div class="d-flex">
        <h4 class="productsingle__brand">Brand: {{ productsSingleStore.productsSingle?.brand }}</h4>
        <p class="productsingle__price">Price: {{ productsSingleStore.productsSingle?.price }}$</p>
      </div>
      <p class="productsingle__desc"> Product information:
        {{ productsSingleStore.productsSingle?.description }}</p>
        <div class="productsingle__item">
          <h4 class="productsingle__category">Category: {{ productsSingleStore.productsSingle?.category }}</h4>
          <h5 class="productsingle__rating">Product rating: {{ productsSingleStore.productsSingle?.rating }}</h5>
        </div>
        <div class="productsingle__button">
          <button class="productsingle__btn" @click="basketStore.addToBasket(productsSingleStore.productsSingle?.id), basketStore.productsAmount(productsSingleStore.productsSingle?.count) " >Buy</button>
        </div>
    </div>


  </section>
</template>


<style>
.swiperSlide {
  text-align: center;
}
</style>
