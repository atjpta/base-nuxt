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

            if (res[0].role == myConstant.LIST_ROLES.Admin || res[0].role == myConstant.LIST_ROLES.Root) {
                const useAdmin = adminStore()
                useAdmin.admin = res[0];
                localStorage.setItem("admin", JSON.stringify(res[0]));
            }

            this.user = res[0];
            localStorage.setItem("user", JSON.stringify(res[0]));

            baseService.setToken(this.user.accessToken)
            baseService.setRefreshToken(this.user.refreshToken)

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

        update(user) {
            this.user.avatar = user.avatar
            this.user.fullName = user.fullName
            localStorage.setItem("user", JSON.stringify(this.user));
        }
    },
});