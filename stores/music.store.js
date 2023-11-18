import { defineStore } from "pinia";
import service from "~/services/base.service";
const baseService = new service.BaseService()
export const musicStore = defineStore("musicStore", {
    id: 'music',
    state() {
        return {
            model: {},
            list: [],
            urlBase: '/musics',
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

        async getRandom(id, size) {
            const records = await baseService.get(`${this.urlBase}/random/${id}?size=${size}`)
            this.list = records
            return records
        },

        async getByModel(type, id, page, limit) {
            const records = await baseService.get(`${this.urlBase}/model/${type}/${id}?page=${page}&limit=${limit}`)
            this.list = records[0].list
            return records[0]
        },

        async update(id, data) {
            const records = await baseService.put(`${this.urlBase}/${id}`, data)
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
        },

        async getTotalView() {
            const records = await baseService.get(`${this.urlBase}/total-view`)
            return records[0].total
        }
    },
});