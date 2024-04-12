import apiProducts from '@/helpers/api/api'
import { defineStore } from 'pinia'

export const useProductsSingleStore = defineStore('productsSingle',  {
    state: () => ({
        productsSingle: null
    }),
    actions: {
        async getFetchSingleProducts(id) {
            try {
                const res = await apiProducts.getSingleProducts(id)
                this.productsSingle = res
            } catch (error) {
                console.error(error);
            }
        },
        
    }
});