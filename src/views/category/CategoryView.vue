<script setup>
import { useCategoryStore } from '@/stores/categoryStore';




const categoryStore = useCategoryStore()
categoryStore.getFetchCategoryProducts();

</script>
<template>
    <section class="products__categories">
        <h2 class="products__categories-title">Categories</h2>
        <div class="products__categories-titles container" >
            <RouterLink :to="'/categorySingle/' + item" class="products__categories-name" v-for="item in categoryStore.categoryProducts" :key="item">{{ item }}</RouterLink>
        </div>
    </section>
</template>
