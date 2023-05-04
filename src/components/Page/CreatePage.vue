<template>
    <div class="h-screen w-full flex flex-col justify-center items-center space-y-4 font-mono">
        <input type="text" class="bg-gray-100 border rounded-xl w-1/2 h-10">
        <textarea v-model="length" @keydown="update" class="bg-gray-100 border rounded-xl w-1/2 h-1/2" name="" id="MyID" cols="30" rows="10"></textarea>
        <div v-html="length"></div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

let length = ref('');

function update() {
    console.log(length.value);
}
</script>

<style lang="css" scoped>

</style>