<template>
    <div class="w-fit mx-auto">
        <Form @submit="createNewPassword" :validation-schema="FormSchema">
            <div class="space-y-5">
                <div class="mx-auto">
                    <div class="join indicator">
                        <div class="btn join-item">
                            <font-awesome-icon class="text-teal-400 text-xl" :icon="['fas', 'lock']" />
                        </div>
                        <div class="indicator-item top-1/2 right-5 join-item">
                            <font-awesome-icon @click="showNewPassword()" class="cursor-pointer"
                                :icon="['fas', typeNewPassword == 'text' ? 'eye-slash' : 'eye']" />
                        </div>
                        <Field :placeholder="t('New password')" name="newPassword" :type="typeNewPassword"
                            class="input sm:w-80 join-item placeholder:italic" />
                    </div>
                    <div class="text-red-900 ml-14">
                        <ErrorMessage name="newPassword" class="error-feedback" />
                    </div>
                </div>

                <div class="mx-auto">
                    <div class="join indicator">
                        <div class="btn join-item">
                            <font-awesome-icon class="text-teal-400 text-xl" :icon="['fas', 'lock']" />
                        </div>
                        <div class="indicator-item top-1/2 right-5 join-item">
                            <font-awesome-icon @click="showReNewPassword()" class="cursor-pointer"
                                :icon="['fas', typeReNewPassword == 'text' ? 'eye-slash' : 'eye']" />
                        </div>
                        <Field :placeholder="t('Re new Password')" name="reNewPassword" :type="typeReNewPassword"
                            class="input sm:w-80 join-item placeholder:italic" />
                    </div>
                    <div class="text-red-900 ml-14">
                        <ErrorMessage name="reNewPassword" class="error-feedback w-full" />
                    </div>
                </div>
                <div class="text-center">
                    <button :class="[loading ? 'loading' : '']" class="btn">
                        {{ t("Change password") }}
                    </button>
                </div>
            </div>
        </Form>
    </div>
</template>

<script setup>
import * as Yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
const { t } = useI18n();
const loading = ref();
const useUser = userStore();
const useNotification = notificationStore();
const typeReNewPassword = ref("password");
const typeNewPassword = ref("password");
const FormSchema = Yup.object().shape({
    newPassword: Yup.string()
        .notOneOf(
            [Yup.ref("password")],
            t("New password must be different from the old password.")
        )
        .required(t("New password cannot be empty."))
        .min(2, t("New password needs at least 2 characters."))
        .max(50, t("New password with at most 50 characters.")),
    reNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], t("Wrong reNewPassword!"))
        .required(t("ReNewPassword cannot be empty.")),
});

const showNewPassword = () => {
    if (typeNewPassword.value == "text") {
        typeNewPassword.value = "password";
    } else typeNewPassword.value = "text";
};

const showReNewPassword = () => {
    if (typeReNewPassword.value == "text") {
        typeReNewPassword.value = "password";
    } else typeReNewPassword.value = "text";
};

const createNewPassword = async (data) => {
    try {
        loading.value = true;
        await useUser.forgetPassword(data.newPassword);
        useNotification.show("success", t("Change success!"));
    } catch (error) {
        if (error.message == BaseHttpStatus.UNAUTHORIZED.code) {
            useNotification.show("error", t("Please try again later"));
        } else {
            useNotification.show("error", t("Can't change password!"));
        }
    } finally {
        loading.value = false;
    }
};
</script>

<style></style>
