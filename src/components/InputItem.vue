<template>
  <div class="w-3/4">
    <label :for="name"
      class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
      <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :type="type" :id="name" :placeholder="name"
        class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm">
      <span
        class="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
      {{ name }}
      </span>
    </label>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  type: String,
  name: String
});



</script>

<style lang="scss" scoped></style>