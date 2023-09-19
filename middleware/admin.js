
export default defineNuxtRouteMiddleware((to, from) => {

    let admin

    if (to.fullPath == from.fullPath) {
        admin = JSON.parse(localStorage.getItem("admin"));
        if (admin?._id) {
            adminStore().loadAuthState()
            return
        }
    }
    else {
        admin = adminStore().admin
        if (admin?._id) {
            adminStore().setToken()
        } else {
            adminStore().loadAuthState()
        }
    }
    if (admin?._id) {
        return
    }
    else {
        navigateTo('/error/404')
    }


})