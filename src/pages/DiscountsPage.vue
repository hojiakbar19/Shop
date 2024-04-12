<script setup>
import Card from "@/components/card/Card.vue";
import DiscountsCard from "@/components/card/DiscountsCard.vue";
import { useProductsStore } from "@/stores/productsStore";
import { ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const productsStore = useProductsStore();
productsStore.getFetchProductsAll(100);

const itemsPerPage = 12;
const currentPage = ref(+route.query.page || 1);

const products = ref(null);

const search = ref("");

function onClickHandler(page) {
  if (page === 1) {
    router.push(`/discounts`);
  } else {
    router.push(`/discounts?page=${page}`);
  }
}

watchEffect(() => {
  if (search.value) {
    products.value = productsStore.products?.filter((item) =>
      item.title.toLowerCase().includes(search.value.toLowerCase())

    );
  } else {
    const indexOfLastPage = currentPage.value * itemsPerPage;
    const indexOfFirstPage = indexOfLastPage - itemsPerPage;
    products.value = productsStore.products.slice(
      indexOfFirstPage,
      indexOfLastPage
    );
  }
});

if (+route.query.page > Math.ceil(productsStore.total / 12)) {
  router.push(`/error`);
}


</script>

<template>
  <section class="products">
    <div class="container">
      <h1 class="products__title">Discounts</h1>
      <vue-awesome-paginate :total-items="productsStore.total" :items-per-page="12" :max-pages-shown="3"
        v-model="currentPage" :on-click="onClickHandler" class="products__paginate" />
      <div class="products__cards">
        <DiscountsCard v-for="item in products" :key="item.id" :info="item" />
      </div>
    </div>
  </section>
</template>
