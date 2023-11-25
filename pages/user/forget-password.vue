<template>
    <div class="space-y-10">
        <div>
            <div class="text-center m-10">
                <span
                    class="italic before:h-[98%] before:my-auto py-1 before:block before:absolute before:-inset-1 before:-skew-y-3 before:-skew-x-12 before:bg-gradient-to-r before:from-green-400 before:via-cyan-400 before:to-blue-400 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 relative inline-block">
                    <span class="relative text-white text-3xl font-black px-5">{{
                        t("Find password")
                    }}</span>
                </span>
            </div>
        </div>
        <div>
            <OtherVSteps :step-index="indexStep" :steps="steps" />
        </div>
        <div class="w-fit mx-auto my-10">
            <!--  step 1 -->
            <div v-show="indexStep == steps[0].index">
                <div class="mx-auto">
                    <div class="join">
                        <div class="btn join-item">
                            <font-awesome-icon class="text-teal-400 text-xl" :icon="['fas', 'user']" />
                        </div>

                        <input v-model="username" :placeholder="t('Username')" name="password"
                            class="input sm:w-80 join-item placeholder:italic" />
                    </div>
                </div>
            </div>
            <!--  step 2 -->
            <div v-show="indexStep == steps[1].index">
                <div>
                    <div class="flex justify-center mb-3 space-x-3">
                        <div v-if="timeOut > 0" class="flex justify-center items-center space-x-3">
                            <div>{{ t("Await") }}</div>
                            <span class="countdown"> <span :style="`--value: ${timeOut}`"></span> </span>s
                        </div>
                        <div :class="timeOut > 1 ? 'btn-disabled' : ''" @click="getCodeAgain()" class="btn btn-sm">
                            {{ t("Get again code") }}
                        </div>
                    </div>
                    <div class="mx-auto">
                        <div class="join">
                            <input type="number" v-model="code" :placeholder="t('code')" name="password"
                                class="input sm:w-80 join-item placeholder:italic" />
                        </div>
                    </div>
                </div>
            </div>

            <!--  step 3 -->
            <div v-show="indexStep == steps[2].index">
                <UserVCreateNewPassword />
            </div>
        </div>

        <div v-show="indexStep < 3" class="flex justify-center space-x-10 text-center sm:mx-10 mx-2">
            <div @click="pre()" :class="indexStep == 1 ? 'btn-disabled' : ''" class="btn btn-sm sm:btn-md">
                {{ t("Pre") }}
            </div>

            <div @click="next()" :class="[loading ? 'loading' : '']" class=" btn btn-sm sm:btn-md">
                {{ t("Next") }}
            </div>
        </div>
    </div>
</template>

<script setup>
const { t } = useI18n();
const useNotification = notificationStore();
const timeOut = ref(60);
const indexStep = ref(1);
const useUser = userStore();
const steps = [
    {
        name: t("Enter username"),
        index: 1,
    },
    {
        name: t("Enter code"),
        index: 2,
    },
    {
        name: t("Change password"),
        index: 3,
    },
];

const username = ref("");
const code = ref();
const loading = ref(false);
const next = async () => {
    switch (indexStep.value) {
        case steps[0].index:
            try {
                loading.value = true
                if (!useUser.model?._id || useUser.model.username != username.value) {
                    if (!username.value) {
                        useNotification.show("error", t("Username cannot be empty."));
                        break;
                    }
                    timeOut.value = 60;
                    await getCode();
                }
                if (indexStep.value < steps.length) {
                    indexStep.value++;
                }
            } catch (error) {
                if (error.message == BaseHttpStatus.NO_FOUND.code) {
                    useNotification.show("error", t("Not found username."));
                } else {
                    useNotification.show("error", t("Can't working"));
                }
            } finally {
                loading.value = false
                break;
            }

        case steps[1].index:
            try {
                loading.value = true
                if (!code.value) {
                    useNotification.show("error", t("code cannot be empty."));
                    break;
                }
                await useUser.checkCode(code.value.toString());
                if (indexStep.value < steps.length) {
                    indexStep.value++;
                }
            } catch (error) {
                if (error.message == BaseHttpStatus.NO_FOUND.code) {
                    useNotification.show("error", t("Not found code."));
                } else {
                    useNotification.show("error", t("."));
                }
            } finally {
                loading.value = false
                break;
            }
    }
};

const pre = () => {
    if (indexStep.value > 1) {
        indexStep.value--;
    }
};

const getCode = async () => {
    await useUser.checkUsername(username.value);
    const time = setInterval(() => {
        if (time.value == 0) {
            clearInterval(time);
        }
        timeOut.value--;
    }, 1000);
};

const getCodeAgain = async () => {
    timeOut.value = 60;
    await getCode();
};

onUnmounted(() => {
    useUser.model = {};
    useUser.code = "";
});
</script>

<style></style>
