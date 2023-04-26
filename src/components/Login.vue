<template>
  <div class="flex flex-row lg:w-2/4 space-y-4 m-auto overflow-hidden bg-gray-50 border rounded-2xl">
    <div class="w-1/2 img">
    </div>
    <div class="w-1/2 space-y-6 flex flex-col items-center justify-center">
      <p><span class="text-lg font-bold font-serif">Sign In</span></p>
      <InputItem v-model="email" type="email" name="Email" />
      <InputItem v-model="password" type="password" name="Password" />
      <button
        class="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
        @click="login" type="submit">Login</button>
      <span class="text-teal-600">{{ message }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { ref } from 'vue'
import InputItem from '@/components/InputItem.vue';

let message = ref();
let email = ref();
let password = ref();

function login() {
  axios.post('http://localhost/api/v1/users/login', {
    email: email.value,
    password: password.value
  })
    .then((response) => {
      message = response.data;
    }).catch((error) => {
      console.log(error.data);
    });
}
</script>

<style lang="css" scoped>
.img {
  background-image: url("https://images.unsplash.com/photo-1556566952-11eff3d06ed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80");
  background-repeat:no-repeat;
  background-size:contain;
  height: 40rem;
  width: 50%;
}
</style>