import apiProducts from '@/helpers/api/api'
import {
    defineStore
} from 'pinia'


export const useCategoryStore = defineStore('category', {
    state: () => ({
        categoryProducts: null,
        categorySingleProducts: null,
    }),
    actions: {
     
        async getFetchCategoryProducts() {
            try {
                const res = await apiProducts.getCategoryProducts()
                this.categoryProducts = res
            } catch (error) {
                console.log(error);
            }
        },
        async getFetchSingleCategoryProducts(category) {
            try {
                const res = await apiProducts.getSingleCategoryProducts(category)
                this.categorySingleProducts = res.products
            } catch (error) {
                console.log(error);
            }
        },
    },
    persist: true
});