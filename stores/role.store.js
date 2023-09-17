import { defineStore } from "pinia";
import service from "~/services/base.service";
const baseService = new service.BaseService()
export const roleStore = defineStore("roleStore", {
    id: 'role',
    state() {
        return {
            model: {},
            list: [],
            urlBase: '/roles',
            code: '',
        };
    },
    getters: {

    },
    actions: {

        async findAll() {
            const records = await baseService.get(`${this.urlBase}?page=1&limit=999`)
            this.list = records
            return records
        },
    },
});