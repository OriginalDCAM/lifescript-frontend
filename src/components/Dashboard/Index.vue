<template>
    <div>
        <p>Welcome, {{ user?.first_name }} {{ user?.last_name }} </p>
        <div v-if="user?.books?.length === 0">
            <p>You have no books</p>
        </div>
        <div v-else>
            <p>You have these books
            <p v-for="book
                         in user?.books">{{ book?.title }}</p>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuthStore';

const { user } = useAuth();
</script>
