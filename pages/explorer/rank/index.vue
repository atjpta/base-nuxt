<template>
    <div>
        <OtherVTitle class="my-10 text-center" title="Rank" />
        <div>
            <div class="flex justify-end mb-5">
                <select v-model="selectTimeType" class="select select-success select-sm w-full max-w-xs">
                    <option v-for="i in listType" :key="i" :value="i">{{ t(i) }}</option>
                </select>
            </div>
        </div>
        <div v-show="!loading">
            <div class=" bg-gradient-to-r from-green-400/10 via-cyan-400/10 to-blue-400/10 rounded-2xl sm:px-5 py-5">
                <div class="flex items-center sm:px-5 justify-center text-center sm:text-2xl font-extrabold">
                    <div class="w-16 sm:w-32">
                        {{ t('Top') }}
                    </div>
                    <div class="w-1/2">
                        {{ t('Song') }}
                    </div>
                    <div class="w-16 sm:w-32">
                        {{ t('Count view') }}
                    </div>
                </div>
                <div v-for="(i, index) in useRank.list" :key="i._id">
                    <RankVMono :data="i" :index="index" />
                </div>
            </div>
        </div>

        <div v-show="loading">
            <SkeletonVTable />
        </div>
    </div>
</template>

<script setup>
const selectTimeType = ref('today')
const { t } = useI18n()
const listType = ref([
    'today',
    'month',
    'year',
    'allTime'
])
const useRank = rankStore()

const loading = ref(false)

const getApi = async () => {

    loading.value = true

    const { day, month, year } = myMixin.getDayMonthYear()

    const data = {
        day,
        month,
        year,
        top: myConstant.RANK.top
    }
    console.log(data);
    if (selectTimeType.value == 'month') {
        data.day = ''
    }
    if (selectTimeType.value == 'year') {
        data.day = ''
        data.month = ''
    }
    if (selectTimeType.value == 'allTime') {
        data.day = ''
        data.month = ''
        data.month = ''
    }

    try {
        await useRank.getTop(data.day, data.month, data.year, data.top)
    } catch (error) {
    }
    finally {
        loading.value = false
    }

}

watch(selectTimeType, () => {
    getApi()
}, { deep: true })

onMounted(() => {
    getApi()
})

</script>

<style></style>