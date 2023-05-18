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
            <p>Here is a datagrid with all the users</p>
            <DataTable :value="users" tableStyle="min-width: 50rem">
                <Column field="first_name" header="First Name"></Column>
                <Column field="username" header="Username"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="is_active" header="Active"></Column>
            </DataTable>

        </div>
    </main>
</template>

<script lang="ts" setup>
import { useAuth } from '@/composables/useAuthStore';
import { ref } from 'vue';
import PanelMenu from 'primevue/panelmenu';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional


const { user } = useAuth();



let name = user.value?.firstname;
const items = ref([
    {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
            {
                label: 'View users table',
                icon: 'pi pi-fw pi-users',
                url: 'users'
            },
            {
                label: 'Export users table',
                icon: 'pi pi-fw pi-external-link'
            }
        ]
    }
])

let users = ref();

const FetchUsers = () => {
    const url = 'http://localhost/api/v1/users';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            users.value = data;
        })
        .catch(err => console.log(err));
}

FetchUsers()

</script>

<style lang="scss" scoped></style>