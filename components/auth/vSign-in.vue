<template>
    <div>
        <div class="mx-auto w-fit">
            <Form @submit="handleLogin" :validation-schema="FormSchema">
                <div
                    class="pt-10 pb-5 sm:px-20 px-5 rounded-md bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 space-y-5">
                    <div class="mx-auto">
                        <div class="join">
                            <div class="btn join-item">
                                <font-awesome-icon class="text-teal-400 text-xl" :icon="['fas', 'user']" />
                            </div>
                            <Field :placeholder="t('Username')" name="username" type="text"
                                class="input sm:w-80 join-item placeholder:italic" />
                        </div>
                        <div class="text-red-900 ml-14">
                            <ErrorMessage name="username" class="error-feedback" />
                        </div>
                    </div>

                    <div class="mx-auto">
                        <div class="join indicator">
                            <div class="btn join-item">
                                <font-awesome-icon class="text-teal-400 text-xl" :icon="['fas', 'lock']" />
                            </div>
                            <div class="indicator-item top-1/2 right-5 join-item">
                                <font-awesome-icon @click="showPassword()" class="cursor-pointer"
                                    :icon="['fas', typePassword == 'text' ? 'eye-slash' : 'eye']" />
                            </div>
                            <Field :placeholder="t('Password')" name="password" :type="typePassword"
                                class="input sm:w-80 join-item placeholder:italic" />
                        </div>
                        <div class="text-red-900 ml-14">
                            <ErrorMessage name="password" class="error-feedback" />
                        </div>
                        <div class="flex justify-between">
                            <div class="text-center text-white cursor-pointer hover:scale-110 duration-300 italic">
                                <NuxtLink to="/auth/sign-up" class="">
                                    {{ t("Forgot password?") }}
                                </NuxtLink>
                            </div>
                            <div class="text-center text-white cursor-pointer hover:scale-110 duration-300 italic">
                                <NuxtLink to="/auth/sign-up" class=""> {{ t("Not account?") }} </NuxtLink>
                            </div>
                        </div>
                    </div>

                    <div class="text-center">
                        <button :class="[loading ? 'loading' : '']" class="btn">
                            {{ t("Login") }}
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>

<script setup>
import * as Yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
const useAuth = authStore();

const { t } = useI18n();
const loading = ref();
const useNotification = notificationStore();
const typePassword = ref("password");
const FormSchema = Yup.object().shape({
    username: Yup.string()
        .required(t("Username cannot be empty."))
        .min(2, t("Username needs at least 2 characters."))
        .max(50, t("Username with at most 50 characters.")),
    password: Yup.string()
        .required(t("Password cannot be empty."))
        .min(2, t("Password needs at least 2 characters."))
        .max(50, t("Password with at most 50 characters.")),
});

const showPassword = () => {
    if (typePassword.value == "text") {
        typePassword.value = "password";
    } else typePassword.value = "text";
};

const handleLogin = async (user) => {
    try {
        loading.value = true;
        await useAuth.login(user);
        useNotification.show("success", t("Login success!!."));
        navigateTo("/");
    } catch (error) {
        if (error.message == "404") {
            useNotification.show("error", t("Wrong username."));
        } else if (error.message == "400") {
            useNotification.show("error", t("Wrong password."));
        } else {
            useNotification.show("error", t("Can't login."));
        }
    } finally {
        loading.value = false;
    }
};
</script>

<style></style>
