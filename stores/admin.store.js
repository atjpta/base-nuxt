import { defineStore } from "pinia";
import service from "~/services/base.service";
const baseService = new service.BaseService()
export const adminStore = defineStore("adminStore", {
    id: 'admin',
    state() {
        return {
            admin: {},
        };
    },
    getters: {

    },
    actions: {
        async logout() {
            this.admin = {}
            baseService.setToken('')
            baseService.setRefreshToken('')
            localStorage.removeItem('admin')
            navigateTo('/admin')
        },

        async loadAuthState() {
            this.admin = (await JSON.parse(localStorage.getItem("admin"))) || {};
            baseService.setToken(this.admin.accessToken)
            baseService.setRefreshToken(this.admin.refreshToken)
        },

        async setToken() {
            baseService.setToken(this.admin.accessToken)
            baseService.setRefreshToken(this.admin.refreshToken)
        }
    },
});