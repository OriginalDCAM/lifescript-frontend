<template>
  <div
    class="flex flex-row lg:w-2/4 sm:h-full md:h-full lg:h-full  space-y-4 m-auto overflow-hidden bg-gray-50 border rounded-2xl">
    <div class="w-1/2 hidden img sm:block">
    </div>
    <div class="w-full p-4 space-y-6 flex flex-col items-center justify-center sm:w-1/2">
      <p><span class="text-lg font-bold font-serif">Sign in</span></p>
      <form @submit.stop.prevent="login" class="space-y-6">
        <span class="p-float-label">
          <InputText id="email" class="p-input-sm" v-model="email" />
          <label for="email">Email</label>
        </span>
        <span class="p-float-label">
          <Password v-model="password" :feedback="false" />
          <label for="password">Password</label>
        </span>
        <div class="inline-flex justify-center w-full">
          <Button label="Login" type="submit" class="w-full md:w-full" />
        </div>
      </form>
      <Message v-if="errorMessage" severity="error">{{ errorMessage }}</Message>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuthStore';

import Button from 'primevue/button';
import Message from 'primevue/message';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

const { isAuthenticated, loginUser } = useAuth();

let successMessage = ref();
let errorMessage = ref();
let email = ref();
let password = ref();


const validateEmail = (email: string) => {
  // Regular expression to validate email format
  return /\S+@\S+\.\S+/.test(email);
}

const router = useRouter();

const login = async () => {
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

  const { status, message } = await loginUser(email.value, password.value);

  if (status === 404) {
    errorMessage.value = message;
    return;
  }

  if (isAuthenticated.value) {
    router.push({ name: 'dashboard' });
  }


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