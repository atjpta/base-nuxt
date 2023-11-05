import { defineStore } from "pinia";
import service from "~/services/base.service";
const baseService = new service.BaseService()
export const statusCommentStore = defineStore("statusCommentStore", {
    id: 'statusComment',
    state() {
        return {
            model: {},
            list: [],
            urlBase: '/status-comments',

        };
    },
    getters: {

    },
    actions: {
        async findAllWarning(page, limit) {
            const records = await baseService.get(`${this.urlBase}/warning?page=${page}&limit=${limit}`)
            this.list = records[0].list
            return records[0]
        },

        async findAllBanned(page, limit) {
            const records = await baseService.get(`${this.urlBase}/banned?page=${page}&limit=${limit}`)
            this.list = records[0].list
            return records[0]
        },

        async update(id, data) {
            const records = await baseService.put(`${this.urlBase}/${id}`, data)
            this.model = records[0]
            return records[0]
        },

        async create(data) {
            const records = await baseService.post(`${this.urlBase}`, data)
            return records[0]
        },

    },
});