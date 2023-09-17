import { defineStore } from "pinia";
import service from "~/services/base.service";
const baseService = new service.BaseService()
export const userStore = defineStore("userStore", {
    id: 'user',
    state() {
        return {
            model: {},
            list: [],
            urlBase: '/users',
            code: '',
        };
    },
    getters: {

    },
    actions: {
        async findOne(id) {
            const records = await baseService.get(`${this.urlBase}/${id}`)
            return records[0]
        },
        async changePassword(password, newPassword) {
            await baseService.put(`${this.urlBase}/password`, { password, newPassword })
        },

        async checkUsername(username) {
            const records = await baseService.get(`${this.urlBase}/check-username?username=${username}`)
            this.model = records[0]
            return records[0]
        },
        async checkCode(code) {
            await baseService.get(`${this.urlBase}/check-code?code=${code}`)
            this.code = code
            return code
        },
        async forgetPassword(password) {
            await baseService.put(`${this.urlBase}/forget-password`, {
                username: this.model.username,
                code: this.code,
                newPassword: password
            })
        },
        async update(data) {
            const records = await baseService.put(this.urlBase, data)
            this.model = records[0]
            return records[0]
        },
        async findAll(page, limit) {
            const records = await baseService.get(`${this.urlBase}?page=${page}&limit=${limit}`)
            return records[0]
        },

        async updateRole(id, data) {
            const records = await baseService.put(`${this.urlBase}/${id}`, data)
            return records[0]
        },
    },
});