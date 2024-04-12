import {
    defineStore
} from 'pinia'
import { useProductsStore } from './productsStore';

export const useBasketStore = defineStore('basket', {
    state: () => ({
        productsStore: useProductsStore(),
        basket: [],
        total: 0,
        basketAmount: 0,
    }),
    actions: {
        addToBasket(id) {
            const idProduct = this.productsStore.products?.find((item) => item.id == id);
            const idBasket = this.basket?.find((item) => item.id == id)

            if (idBasket?.id !== idProduct.id) {
                this.basket.push({
                    ...idProduct,
                    count: 1,
                    get totalSum() {
                        return this.price * this.count;
                    },
                });
            } else {
                this.basket.forEach((item) => {
                    if (item.id == id) {
                        item.count++
                    }
                })
            }
        },
        dellBasket(id, totalSum, count) {
            const productId = this.basket?.find((item) => item.id == id)
            const productIndex = this.basket?.findIndex((item) => item.id == id)
            if (productId.id == id) {
                this.basket.splice(productIndex, 1)
                this.total - totalSum
            }
            this.total -= totalSum
            this.basketAmount -= count
        },
        // productsTotalPrice() {
        //     let num = 0;
        //     this.basket.forEach((element) => {
        //         this.total = num += element.totalSum;
        //     });
        // },
        productsAmount(count) {
            let amount = 0;
            this.basket.forEach((element) => {
              this.basketAmount = amount += element.count;
            });
          },


    },
    persist: true
});