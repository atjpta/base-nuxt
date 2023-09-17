

import { authStore } from "~/stores/auth.store"

export default defineNuxtRouteMiddleware((to, from,) => {

    let admin

    if (to.fullPath == from.fullPath) {
        admin = JSON.parse(localStorage.getItem("admin"));
    }
    else {
        admin = authStore().admin
    }
    if (admin?._id) {
        return navigateTo('/admin/manager/overview')
    }
    else {
        navigateTo(to.fullPath)
    }


})