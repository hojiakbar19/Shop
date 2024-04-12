<script setup>
import Card from "@/components/card/Card.vue";
import SearchCard from "@/components/card/SearchCard.vue";
import { useProductsStore } from "@/stores/productsStore";
import { ref, watch, watchEffect } from "vue";
import { VueAwesomePaginate } from "vue-awesome-paginate";
import { useRoute, useRouter } from "vue-router";
// import debounce from "lodash.debounce";

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
    router.push(`/`);
  } else {
    router.push(`/?page=${page}`);
  }
}

watchEffect(() => {
  if (search.value) {
    const searchProduct = products.value = productsStore.products?.filter((item) =>
      item.title.toLowerCase().includes(search.value.toLowerCase())
    );
    productsStore.total = searchProduct.length 
  } else {
    const indexOfLastPage = currentPage.value * itemsPerPage;
    const indexOfFirstPage = indexOfLastPage - itemsPerPage;
    products.value = productsStore.products?.slice(
      indexOfFirstPage,
      indexOfLastPage
    );
  }
});


if (+route.query.page > Math.ceil(productsStore.total / 12)) {
  router.push(`/error`);
}

const sort = ref("Title")

watch(sort, () => {
  if (sort.value == "Title") {
    productsStore.getTitleSorted()
  } else if (sort.value == "Rating") {
    productsStore.getRatingSorted()
  } else if (sort.value == "Expensive") {
    productsStore.getExpensiveSorted()
  } else {
    productsStore.getCheapSorted()
  }
});

</script>

<template>
  <section class="products">
    <div class="container">
      <h1 class="products__title">Products</h1>
      <input type="text" placeholder="Search..." class="products__input" v-model="search" />
      <div class="products__select-div">
        <select class="products__select" v-model="sort">
          <option>Title</option>
          <option>Rating</option>
          <option>Expensive</option>
          <option>Cheap</option>
        </select>
      </div>
      <vue-awesome-paginate :total-items="productsStore.total" :items-per-page="12" :max-pages-shown="3"
        v-model="currentPage" :on-click="onClickHandler" class="products__paginate" />
      <div class="products__cards">
        <Card v-for="item in products" :key="item.id" :info="item"  />
      </div>
      <div class="products__item" v-if="products == ''">
        <h2>No Results</h2>
      </div>
    </div>
  </section>
</template>
