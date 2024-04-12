import apiProducts from "@/helpers/api/api";
import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: null,
    total: 0,
    productsAll: null,
  }),
  actions: {
    async getFetchProductsAll(limit = 100) {
      try {
        const res = await apiProducts.getProductsAll(limit);
        this.products = res.products;
        this.total = res.total;
      } catch (error) {
        console.error(error);
      }
    },
    getTitleSorted() {
      this.products?.sort((a, b) => {
          return a.id - b.id
      });
  },
  getRatingSorted() {
      this.products?.sort((a, b) => {
          return a.rating - b.rating
      });
  },
  getExpensiveSorted() {
      this.products?.sort((a, b) => {
          if(a.price > b .price) {
              return -1
          }
          return 1
      });
  },
  getCheapSorted() {
      this.products?.sort((a, b) => {
          if(a.price < b.price) {
              return -1
          }
          return 1
      });
  },
  },
  persist: true,
});
