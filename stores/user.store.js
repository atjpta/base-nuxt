import { defineStore } from "pinia";
import service from "~/services/base.service";
const baseService = new service.BaseService()
export const userStore = defineStore("userStore", {
    id: 'user',
    state() {
        return {
            model: {},
            list: [],
            urlBase: '/users'
        };
    },
    getters: {

    },
    actions: {
        async findOne(id) {
            const records = await baseService.get(`${this.urlBase}/${id}`)
            this.model = records[0]
        }
    },
});