import { defineStore } from "pinia";
import service from "~/services/base.service";
const baseService = new service.BaseService()
export const permissionStore = defineStore("permissionStore", {
    id: 'permission',
    state() {
        return {
            model: {},
            list: [],
            urlBase: '/permissions',
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