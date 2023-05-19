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
import { ref } from 'vue'
import InputItem from '@/components/InputItem.vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuthStore';

const { isAuthenticated, loginUser } = useAuth();

let successMessage = ref();
let errorMessage = ref();
let email = ref();
let password = ref();

const router = useRouter();

const validateEmail = (email: string) => {
  // Regular expression to validate email format
  return /\S+@\S+\.\S+/.test(email);
}

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

  await loginUser(email.value, password.value);

  if (isAuthenticated.value) {
    router.push({ name: 'Dashboard' });
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