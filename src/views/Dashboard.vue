<template>
    <main class="w-full flex flex-row h-full ">
        <div class="hidden sm:block sm:min-w-3/6 md:w-2/6 lg:w-2/12 bg-slate-50 p-4">
            <div class="w-11/12 bg-slate-100 h-full border rounded-xl">
                <PanelMenu :model="items" />
            </div>
        </div>
        <div class="w-full md:w-full bg-slate-100">
            <div class="card flex justify-content-center">
            </div>
            <p></p>
        </div>
    </main>
</template>

<script lang="ts" setup>
import { useAuth } from '@/composables/useAuthStore';
import { ref } from 'vue';
import PanelMenu from 'primevue/panelmenu';

const { user } = useAuth();

const items = ref([
    {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
            {
                label: 'View users table',
                icon: 'pi pi-fw pi-users',
                to: 'dashboard/users',
                preventDefault: false,
            },
            {
                label: 'Export users table',
                icon: 'pi pi-fw pi-external-link'
            }
        ]
    }
])

</script>

<style lang="scss" scoped></style>