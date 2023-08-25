import { authStore } from "~/stores/auth.store"

export default defineNuxtRouteMiddleware((to, from,) => {

    let user

    if (to.fullPath == from.fullPath) {
        user = JSON.parse(localStorage.getItem("user"));
    }
    else {
        user = authStore().user
    }

    if (user?._id) {
        return navigateTo('/')
    }
    else {
        navigateTo(to.fullPath)
    }


})