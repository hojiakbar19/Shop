import axiosClient from "./axiosClient";

const apiProducts = {
    getProductsAll(limit) {
        const url = `products?limit=${limit}`
        return axiosClient.get(url)
    },
    getSearch(search) {
        const url = `products/search?q=${search}`
        return axiosClient.get(url)
    },
    getSingleProducts(id) {
        const url = `products/${id}`
        return axiosClient.get(url)
    },
    getCategoryProducts() {
        const url = `products/categories`
        return axiosClient.get(url)
    },
    getSingleCategoryProducts(category) {
        const url = `products/category/${category}`
        return axiosClient.get(url)
    },
}

export default apiProducts