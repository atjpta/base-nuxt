import { defineStore } from "pinia";
import service from "~/services/base.service";
const baseService = new service.BaseService()
export const genreStore = defineStore("genreStore", {
    id: 'genre',
    state() {
        return {
            model: {},
            list: [],
            urlBase: '/genres',

        };
    },
    getters: {

    },
    actions: {
        async search(key, page, limit) {
            const records = await baseService.get(`${this.urlBase}?page=${page}&limit=${limit}&key=${key}`)
            this.list = records[0].list
            return records[0]
        },

        async update(id, data) {
            const records = await baseService.put(`${this.urlBase}/${id}`, data)
            this.model = records[0]
            return records[0]
        },

        async findOne(id) {
            const records = await baseService.get(`${this.urlBase}/${id}`)
            this.model = records[0]
            return records[0]
        },

        async deleteOne(id) {
            const records = await baseService.delete(`${this.urlBase}/${id}`)
            return records[0]
        },

        async create(data) {
            const records = await baseService.post(`${this.urlBase}`, data)
            return records[0]
        },

        async getTotal() {
            const records = await baseService.get(`${this.urlBase}/total`)
            return records[0].total
        }

    },
});