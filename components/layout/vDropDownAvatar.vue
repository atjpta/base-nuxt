<template>
    <div>
        <div class="sm:h-12 h-8">
            <div class="dropdown dropdown-end dropdown-hover">
                <label tabindex="0" class="cursor-pointer">
                    <img class="sm:h-12 sm:w-12 w-8 h-8 rounded-full" :src="user.avatar" alt="" />
                </label>
                <ul tabindex="0"
                    class="dropdown-content z-[1] menu bg-base-100 lg:menu-horizontal rounded-box lg:mb-64 w-52 p-0">
                    <div class="bg-gradient-to-r from-green-400/10 via-cyan-400/10 to-blue-400/10 w-full p-2 rounded-box">
                        <div class="flex justify-start items-center m-2 space-x-2">
                            <div class="btn btn-circle cursor-default">
                                <img class="w-12 h-12 rounded-full bg-white/10" :src="user.avatar" alt="" />
                            </div>
                            <div class="font-medium text-ellipsis overflow-hidden w-full">
                                {{ user.fullName }}
                            </div>
                        </div>
                        <li>
                            <a @click="navigateTo(`/user/${user._id}/home`)" class="w-full">
                                <font-awesome-icon class="text-teal-400 text-xl" :icon="['fas', 'address-card']" />
                                <div>
                                    {{ t("Profile") }}
                                </div>
                            </a>
                        </li>
                        <li>
                            <a @click="navigateTo(`/user/${user._id}/setting`)" class="">
                                <font-awesome-icon class="text-teal-400 text-xl" :icon="['fas', 'gear']" />
                                <div>
                                    {{ t("Setting") }}
                                </div>
                            </a>
                        </li>
                        <li @click="logout()">
                            <a class="">
                                <font-awesome-icon class="text-teal-400 text-xl" :icon="['fas', 'right-from-bracket']" />
                                <div>
                                    {{ t("Logout") }}
                                </div>
                            </a>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
const { t } = useI18n();
const useAuth = authStore();
const useAdmin = adminStore()
const route = useRoute();
const logout = () => {
    if (route.path.includes('admin')) {
        return useAdmin.logout()
    }
    return useAuth.logout()
}

const user = ref(route.path.includes('admin') ? useAdmin.admin : useAuth.user)

</script>

<style></style>
