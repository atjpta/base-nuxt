import { defineStore } from "pinia";
import service from "~/services/base.service";
const baseService = new service.BaseService()
export const notificationsServerStore = defineStore("notificationsServerStore", {
    id: 'notificationsServer',
    state() {
        return {
            model: {},
            list: [],
            urlBase: '/notifications',
        };
    },
    actions: {
        async findAllByUser() {
            const records = await baseService.get(`${this.urlBase}/user`)
            this.list = records
            return records
        },

        async create(data) {
            const records = await baseService.post(`${this.urlBase}`, data)
            return records[0]
        },

        async updateViewOne(id, data) {
            const records = await baseService.put(`${this.urlBase}/${id}`, data)
            this.model = records[0]
            return records[0]
        },

        async updateViewByUser() {
            const records = await baseService.put(`${this.urlBase}/user`)
            this.model = records[0]
            return records[0]
        },

        async deleteOne(id) {
            const records = await baseService.delete(`${this.urlBase}/${id}`)
            return records[0]
        },

        async deleteByUser() {
            const records = await baseService.delete(`${this.urlBase}/user`)
            return records[0]
        },

    },
});