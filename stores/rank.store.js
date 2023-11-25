import { defineStore } from "pinia";
import service from "~/services/base.service";
const baseService = new service.BaseService()
export const rankStore = defineStore("rankStore", {
    id: 'rank',
    state() {
        return {
            model: {},
            list: [],
            urlBase: '/view-details',
            code: '',
        };
    },
    getters: {

    },
    actions: {

        async getTop(day, month, year, top) {
            let query = `top=${top}`
            if (day) {
                query += `&day=${day}`
            }
            if (month) {
                query += `&month=${month}`
            }
            if (year) {
                query += `&year=${year}`
            }

            const records = await baseService.get(`${this.urlBase}/top?${query}`)
            this.list = records
            return records
        },

        async getByMonth(month, year, music) {
            const records = await baseService.get(`${this.urlBase}/month?month=${month}&year=${year}&music=${music}`)
            this.list = records
            return records
        },

        async getByYear(year, music) {
            const records = await baseService.get(`${this.urlBase}/year?&year=${year}&music=${music}`)
            this.list = records
            return records
        },
    },
});