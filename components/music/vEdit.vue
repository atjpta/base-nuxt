<template>
    <div>
        <dialog v-if="data" ref="modal" class="modal">
            <form method="dialog"
                class="modal-box py-10 glass bg-gradient-to-r from-green-400/20 via-cyan-400/20 to-blue-400/20 bg-base-100">
                <div class="space-y-5">

                    <div>
                        <div class="text-2xl">
                            {{ t('Name song') }}

                        </div>
                        <input v-model="name" type="text" :placeholder="t('Enter name...')"
                            class="input input-bordered input-success w-full max-w-xs" />
                    </div>

                    <div>
                        <div class="text-2xl">
                            {{ t('Avatar') }}

                        </div>
                        <UploadVUploadImage :data="avatar" />
                    </div>

                    <div>
                        <div class="text-2xl">
                            {{ t('File song') }}

                        </div>
                        <UploadVUploadSong :data="song" />
                    </div>

                    <div>
                        <div class="text-2xl">
                            {{ t('genre') }}

                        </div>
                        <OtherVSelectList v-if="isShow" :data="data.genre" :list="useGenre.list" />
                    </div>

                    <div>
                        <div class="text-2xl">
                            {{ t('singer') }}

                        </div>
                        <OtherVSelectList v-if="isShow" :data="data.singer" :list="useSinger.list" />
                    </div>

                    <div>
                        <div class="text-2xl">
                            {{ t('country') }}

                        </div>
                        <OtherVSelectList v-if="isShow" :data="data.country" :list="useCountry.list" />
                    </div>

                    <div class="flex justify-end space-x-5">
                        <div :class="loading ? 'loading' : ''" @click="emitSave" class="btn btn-primary btn-sm">
                            {{ t('Save') }}
                        </div>
                        <button class="btn text-error btn-ghost btn-sm">
                            {{ t('Cancel') }}
                        </button>
                    </div>
                </div>
            </form>


            <form method="dialog" class="modal-backdrop">
                <button ref="btnClose">close</button>
            </form>

        </dialog>

    </div>
</template>

<script setup>
const props = defineProps({
    data: Object,
    loading: Boolean,
})

const { t } = useI18n()
const avatar = ref({
    file: null,
    url: null
})

const useSinger = singerStore();
const useCountry = countryStore();
const useGenre = genreStore();

const song = ref({
    file: null,
    url: null
})

const isShow = ref(false)


const btnClose = ref()

const modal = ref()

const name = ref()
const useNotification = notificationStore()
const emit = defineEmits(['save'])

const emitSave = () => {
    const form = new FormData()
    avatar.value.file ? form.append("file", avatar.value.file) : ''
    song.value.file ? form.append("file", song.value.file) : ''
    name.value ? form.append("name", name.value) : ''
    props.data.genre ? form.append("genre", getArray(props.data.genre)) : (() => { useNotification.show('info', t('Please enter genre!!')); return });
    props.data.singer ? form.append("singer", getArray(props.data.singer)) : (() => { useNotification.show('info', t('Please enter singer!!')); return });
    props.data.country ? form.append("country", getArray(props.data.country)) : (() => { useNotification.show('info', t('Please enter country!!')); return });
    emit('save', form, close)
}

const openModal = async () => {
    modal.value.showModal();
    name.value = props.data.name
    avatar.value.url = props.data.url_image
    song.value.url = props.data.url
    isShow.value = true
}

const close = () => {
    btnClose.value.click()
    setDefault()
}

const setDefault = async () => {
    if (props.data) {
        name.value = null
        props.data.openModal = openModal

    }

}

function getArray(set) {
    let list = [];
    set.forEach((e) => {
        list.push(e._id);
    });
    return list
}

onMounted(() => {

    setDefault()
})

</script>

<style></style>