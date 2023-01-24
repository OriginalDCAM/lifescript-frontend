<template>
    <label
  for="UserEmail"
  class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
>
{{ email }}
  <input
    v-model="email"
    type="email"
    id="UserEmail"
    placeholder="Email"
    class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
  />

  <span
    class="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
  >
    Email
  </span>
</label>
<label
  for="UserPassword"
  class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
>
{{ password }}
  <input
    v-model="password"
    type="password"
    id="UserPassword"
    placeholder="Password"
    class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
  />

  <span
    class="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
  >
    Password
  </span>
</label>
<button class="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500" @click="login">Login</button>

</template>

<script lang="ts">
import axios from 'axios'

export default {
    name: 'Login',
    data() {
        return {
            user: [],
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            axios.post('http://localhost/api/v1/users/login', {
                email: this.email,
                password: this.password
            })
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>