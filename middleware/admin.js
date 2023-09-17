
export default defineNuxtRouteMiddleware((to, from,) => {

    let admin

    if (to.fullPath == from.fullPath) {
        admin = JSON.parse(localStorage.getItem("admin"));
        if (admin?._id) {
            adminStore().loadAuthState()
            return
        }
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