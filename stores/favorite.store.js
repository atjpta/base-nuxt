import { defineStore } from "pinia";
import service from "~/services/base.service";
const baseService = new service.BaseService()
export const favoriteStore = defineStore("favoriteStore", {
    id: 'favorite',
    state() {
        return {
            model: {},
            list: [],
            urlBase: '/favorites',

        };
    },
    getters: {

    },
    actions: {

        async findOneByUser(model_id) {

            const records = await baseService.get(`${this.urlBase}/model/${model_id}`)
            return records[0]
        },

        async findModelByUSer(modelType) {

            const records = await baseService.get(`${this.urlBase}/modelType/${modelType}`)
            this.list = records.map(e => e.model)
            return records
        },

        async findModelLength(model_id) {
            const records = await baseService.get(`${this.urlBase}/model/length/${model_id}`)
            return records[0].length
        },

        async deleteOne(id) {

            const records = await baseService.delete(`${this.urlBase}/${id}`)
            return records[0]
        },

        async create(data) {

            const records = await baseService.post(`${this.urlBase}`, data)
            return records[0]
        },
        clear() {
            this.model = {};
        },
    },
});