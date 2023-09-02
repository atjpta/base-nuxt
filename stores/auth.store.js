import { defineStore } from "pinia";
import service from "~/services/base.service";
const baseService = new service.BaseService()
export const authStore = defineStore("authStore", {
    id: 'auth',
    state() {
        return {
            user: {},
            urlBase: '/auth'
        };
    },
    getters: {

    },
    actions: {
        async login(user) {
            const res = await baseService.post(`${this.urlBase}/login`, user)
            this.user = res[0]
            baseService.setToken(this.user.accessToken)
            baseService.setRefreshToken(this.user.refreshToken)
            localStorage.setItem("user", JSON.stringify(this.user));
        },

        async Register(user) {
            const res = await baseService.post(`${this.urlBase}/register`, user)
        },
        async loadAuthState() {
            this.user = (await JSON.parse(localStorage.getItem("user"))) || {};
            baseService.setToken(this.user.accessToken)
            baseService.setRefreshToken(this.user.refreshToken)
        },

        async logout() {
            this.user = {}
            baseService.setToken('')
            baseService.setRefreshToken('')
            localStorage.removeItem('user')
            navigateTo('/auth/sign-in')
        },
    },
});