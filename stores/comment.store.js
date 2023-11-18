import { defineStore } from "pinia";
import service from "~/services/base.service";
const baseService = new service.BaseService()
export const commentStore = defineStore("commentStore", {
    id: 'comment',
    state() {
        return {
            model: {},
            list: [],
            urlBase: '/comments',

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

        async findBy(id) {
            const records = await baseService.get(`${this.urlBase}/model/${id}`)
            return records.map((e) => {
                e.createdAt = myMixin.setTime(e.createdAt);
                return e;
            });
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
        }

    },
});