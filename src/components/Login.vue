<template>
  <div
    class="flex flex-row lg:w-2/4 sm:h-full md:h-full lg:h-full  space-y-4 m-auto overflow-hidden bg-gray-50 border rounded-2xl">
    <div class="w-1/2 hidden img sm:block">
    </div>
    <div class="w-full p-4 space-y-6 flex flex-col items-center justify-center sm:w-1/2">
      <p><span class="text-lg font-bold font-serif">Sign in</span></p>
      <form @submit.stop.prevent="login">
        <InputItem v-model="email" type="email" name="Email" />
        <InputItem v-model="password" type="password" name="Password" />
        <button
          class="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
          type="submit">Login</button>
      </form>
      <span v-if="successMessage" class="text-teal-600">{{ successMessage }}</span>
      <span v-else-if="errorMessage" class="text-red-600">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { ref } from 'vue'
import InputItem from '@/components/InputItem.vue';
import type { IUser } from '@/types/User';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuthStore';

const { initializeAuth, isAuthenticated, setIsAuthenticated } = useAuth();

let successMessage = ref();
let errorMessage = ref();
let email = ref();
let password = ref();

const router = useRouter();

const validateEmail = (email: string) => {
  // Regular expression to validate email format
  return /\S+@\S+\.\S+/.test(email);
}

interface Dictionary<T> {
  [Key: string]: T;
}

if (isAuthenticated.value) {
  router.push({ name: 'Dashboard' });
}


const login = (): void => {
  successMessage.value = '';
  errorMessage.value = '';
  if (!email.value || !password.value) {
    errorMessage.value = 'Please fill in all fields';
    return;
  }

  if (!validateEmail(email.value)) {
    errorMessage.value = 'Please enter a valid email address';
    return;
  }

  const url: string = 'http://localhost/api/v1/users/login';
  const data: Dictionary<string> = {
    email: email.value,
    password: password.value
  }
  const config: Dictionary<Dictionary<string> | boolean> = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  axios.post(url, data, config)
    .then((response) => {
      const token = response.data.access_token;

      const user: IUser = {
        email: response.data.email,
        username: response.data.username,
        firstname: response.data.first_name,
        authenticated: true,
        token: token
      }

      localStorage.setItem('token', JSON.stringify(token));

      successMessage.value = 'Login successful';

      setIsAuthenticated(true);

      router.push({ name: 'Dashboard' });
    })
    .catch((error) => {
      console.error(error);
      return errorMessage.value = error.response.data['detail'];
    });
}
</script>

<style lang="css" scoped>
.img {
  background-image: url("https://images.unsplash.com/photo-1556566952-11eff3d06ed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80");
  background-repeat: no-repeat;
  background-size: contain;
  height: auto;
  width: 40rem;
}

@media only screen and (max-width: 600px) {
  .img {
    display: none;
  }
}
</style>