import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomePage.vue'
import { useProductsStore } from '@/stores/productsStore'
import { useCategoryStore } from '@/stores/categoryStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/productsSingle/:id',
      name: 'productsSingle',
      component: () => import('../pages/ProductsSinglePage.vue'),
      beforeEnter(to, from) {
        const productsStore = useProductsStore()
        productsStore.getFetchProductsAll()
        const exsist = productsStore.products?.find(item => item.id == to.params.id)
        if(!exsist) {
          return {
            name: "NotFound",
            params: { pathMatch: to.path.split("/").slice(1) },
            hash: to.hash,
            query: to.query
          }
        }
      } 
    },
    {
      path: '/:pathMatch(.*)*',
      name: "NotFound",
      component: () => import('../pages/NotFound.vue')
    },
    {
      path: "/category",
      name: "category",
      component: () => import('../pages/CategoryPage.vue')
    },
    {
      path: "/categorySingle/:category",
      name: "categorySingle",
      component: () => import('../pages/CategorySinglePage.vue'),
      beforeEnter(to, from) {
        const categoryStore = useCategoryStore()
        const exsist = categoryStore.categoryProducts?.find(item => item == to.params.category)
        if(!exsist ) {
          return {
            name: 'NotFound',
            params: { pathMatch: to.path.split("/").slice(1) },
            query: to.query,
            hash: to.hash,
          } 
        }
      } 
    },
    {
      path: "/basket",
      name: "basket",
      component: () => import('../pages/BasketPage.vue')
    },
    {
      path: "/discounts",
      name: "discounts",
      component: () => import('../pages/DiscountsPage.vue')
    },
    {
      path: "/contacts",
      name: "contacts",
      component: () => import('../pages/ContactsPage.vue')
    }
  ]
})

export default router
