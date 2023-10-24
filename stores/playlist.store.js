import { defineStore } from "pinia";
import service from "~/services/base.service";
const baseService = new service.BaseService()
export const playlistStore = defineStore("playlistStore", {
    id: 'playlist',
    state() {
        return {
            model: {
                list: []
            },
            list: [],
            urlBase: '/playlists',

        };
    },
    getters: {

    },
    actions: {

        async search(key, page, limit) {
            const records = await baseService.get(`${this.urlBase}/search/?page=${page}&limit=${limit}&key=${key}`)
            this.list = records[0].list
            return records[0]
        },
        async findAll() {
            const records = await baseService.get(`${this.urlBase}`)
            this.list = records
            return records
        },

        async findOne(id) {
            const records = await baseService.get(`${this.urlBase}/${id}`)
            this.model = records[0]
            return records
        },

        async update(id, data) {
            const records = await baseService.put(`${this.urlBase}/${id}`, data)
            this.model = records[0]
            return records[0]
        },

        async addMusic(id, data) {
            const records = await baseService.put(`${this.urlBase}/${id}/add-music`, data)
            return records[0]

        },

        async removeMusic(id, data) {
            const records = await baseService.put(`${this.urlBase}/${id}/remove-music`, data)
            return records[0]
        },



        async deleteOne(id) {
            const records = await baseService.delete(`${this.urlBase}/${id}`)
            return records[0]
        },

        async create(data) {
            const records = await baseService.post(`${this.urlBase}`, data)
            return records[0]
        },

    },
});