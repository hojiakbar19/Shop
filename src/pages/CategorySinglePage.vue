<script setup>
import Card from '@/components/card/Card.vue';
import { useCategoryStore } from '@/stores/categoryStore';
import { useRoute } from 'vue-router';

const route = useRoute()
const categoryStore = useCategoryStore()
categoryStore.getFetchSingleCategoryProducts(route.params.category)
</script>

<template>
   <div class="products__cards container">
      <Card v-for="item in categoryStore.categorySingleProducts" :key="item.id" :info="item" />
   </div>
</template>

