<template>
    <div>
        <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
        <button class="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500" @click="getBooks">Load Books</button>
    </div>
</template>

<script lang="ts">
import axios from 'axios'


    export default {
        name: 'BookList',
        data() {
            return {
                books: [],
            }
        },
        methods: {
            getBooks() {
                axios.get('http://localhost/api/v1/users/?skip=0&limit=100')
                    .then((response) =>  {
                        console.log(response.data)
                    })
                    .catch((error) => {
                        console.log(error.data)
                    })
            }
        }
    }
</script>

<style scoped>

</style>