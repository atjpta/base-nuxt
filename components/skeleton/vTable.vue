<template>
    <div>
        <table
            class="table bg-gradient-to-r from-green-400/10 via-cyan-400/10 to-blue-400/10 rounded-2xl p-5 animate-pulse">
            <tbody>
                <tr v-for="i in myConstant.PAGINATION.minLimit" :key="i" class="h-16 w-full">
                    <div>
                    </div>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>

</script>

<style></style>