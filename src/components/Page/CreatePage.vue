<template>
    <div class="h-screen w-full flex flex-row space-y-4 font-mono">
        <div class="w-1/2">
            <Editor v-model="body"   class="h-3/4" />
        </div>
        <div v-html="body" class="w-1/2"></div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Editor from 'primevue/editor';

let body = ref('');

</script>

<style lang="css" scoped></style>