<template>
    <div>
        <div class="mx-auto w-fit">
            <Form @submit="handleRegister" :validation-schema="FormSchema">
                <div class="pt-10 pb-5 px-20 rounded-md bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 space-y-5">
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
                        <div class="join">
                            <div class="btn join-item">
                                <font-awesome-icon class="text-teal-400 text-xl" :icon="['fas', 'a']" />
                            </div>
                            <Field :placeholder="t('FullName')" name="fullName" type="text"
                                class="input sm:w-80 join-item placeholder:italic" />
                        </div>
                        <div class="text-red-900 ml-14">
                            <ErrorMessage name="fullName" class="error-feedback" />
                        </div>
                    </div>

                    <div class="mx-auto">
                        <div class="join">
                            <div class="btn join-item">
                                <font-awesome-icon class="text-teal-400 text-xl" :icon="['fas', 'envelope']" />
                            </div>
                            <Field :placeholder="t('E-mail')" name="email" type="email"
                                class="input sm:w-80 join-item placeholder:italic" />
                        </div>
                        <div class="text-red-900 ml-14">
                            <ErrorMessage name="email" class="error-feedback" />
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
                    </div>

                    <div class="mx-auto">
                        <div class="join indicator">
                            <div class="btn join-item">
                                <font-awesome-icon class="text-teal-400 text-xl" :icon="['fas', 'lock']" />
                            </div>
                            <div class="indicator-item top-1/2 right-5 join-item">
                                <font-awesome-icon @click="showRePassword()" class="cursor-pointer"
                                    :icon="['fas', typeRePassword == 'text' ? 'eye-slash' : 'eye']" />
                            </div>
                            <Field :placeholder="t('RePassword')" name="rePassword" :type="typeRePassword"
                                class="input sm:w-80 join-item placeholder:italic" />
                        </div>
                        <div class="text-red-900 ml-14">
                            <ErrorMessage name="rePassword" class="error-feedback" />
                        </div>
                        <div class="flex justify-end">
                            <div class="text-center cursor-pointer hover:scale-110 duration-300 italic">
                                <NuxtLink to="/auth/sign-in" class="">
                                    {{ t("Have account?") }}
                                </NuxtLink>
                            </div>
                        </div>
                    </div>

                    <div class="text-center">
                        <button :class="[loading ? 'loading' : '']" class="btn">
                            {{ t("Register") }}
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
const typeRePassword = ref("password");
const FormSchema = Yup.object().shape({
    username: Yup.string()
        .required(t("Username cannot be empty."))
        .min(2, t("Username needs at least 2 characters."))
        .max(50, t("Username with at most 50 characters.")),
    fullName: Yup.string()
        .required(t("FullName cannot be empty."))
        .min(2, t("FullName needs at least 2 characters."))
        .max(50, t("FullName with at most 50 characters.")),
    email: Yup.string()
        .email(t("E-mail is not correct."))
        .required(t("E-mail cannot be empty."))
        .min(2, t("E-mail needs at least 2 characters."))
        .max(50, t("E-mail with at most 50 characters.")),
    password: Yup.string()
        .required(t("Password cannot be empty."))
        .min(2, t("Password needs at least 2 characters."))
        .max(50, t("Password with at most 50 characters.")),
    rePassword: Yup.string()
        .oneOf([Yup.ref("password"), null], t("Wrong rePassword!"))
        .required(t("RePassword cannot be empty.")),
});

const showPassword = () => {
    if (typePassword.value == "text") {
        typePassword.value = "password";
    } else typePassword.value = "text";
};

const showRePassword = () => {
    if (typeRePassword.value == "text") {
        typeRePassword.value = "password";
    } else typeRePassword.value = "text";
};

const handleRegister = async (user) => {
    try {
        loading.value = true;
        delete user.rePassword;
        await useAuth.Register(user);
        useNotification.show("success", t("Register success!!."));
        navigateTo("/auth/sign-in");
    } catch (error) {
        if (error.message == BaseHttpStatus.CONFLICT.code) {
            useNotification.show("error", t("Username was used."));
        } else if (error.message == "400") {
            useNotification.show("error", t("Wrong password."));
        } else {
            useNotification.show("error", t("Can't login."));
            console.log(error);
        }
    } finally {
        loading.value = false;
    }
};
</script>

<style></style>
