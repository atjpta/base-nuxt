import { defineStore } from "pinia";
export const notificationStore = defineStore("notificationStore", {
    id: 'notification',
    state() {
        return {
            list: new Map(),
        };
    },
    getters: {

    },
    actions: {
        show(type, message) {
            const key = new Date().getTime()
            this.list.set(key, { type, message, time: 300 })
        },

        delete(key) {
            this.list.delete(key);
        },

        update(key, time) {
            const value = this.list.get(key)
            if (value) {
                value.time = time
                this.list.set(key, value)
            }
        }
    },
});