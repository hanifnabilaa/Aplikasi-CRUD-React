import http from "./http";

export const ProductsAPI = {
    list: () => http.get("/products").then(r => r.data),
    get: (id) => http.get(`/products/${id}`).then(r => r.data),
    create: (data) => http.post("/products", data).then(r => r.data),
    update: (id, data) => http.put(`/products/${id}`, data).then(r => r.data),
    delete: (id) => http.delete(`/products/${id}`).then(r => r.data),
    remove: (id) => http.delete(`/products/${id}`).then(r => r.data),
}