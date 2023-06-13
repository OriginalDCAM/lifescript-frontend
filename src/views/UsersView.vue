<template>
    <p>Welcome, {{ name }}</p>

    <p>Here is a datagrid with all the users</p>
    <DataTable :value="users" tableStyle="min-width: 50rem">
        <template #empty> No customers found. </template>
        <template #loading> Loading customers data. Please wait. </template>
        <Column>
            <template #body="{data}">
                <div class="space-x-2">
                <a :href='"edit/delete/" + data.id'><i class="pi pi-trash" style="font-size: 1rem;"></i></a>
                    <a :href="'users/edit/' + data.id"><i class="pi pi-pencil" style="font-size: 1rem;"></i></a>
                </div>
            </template>
        </Column>
        <Column v-for="col in columns" :key="col.field" :field="col.field" :header="col.header" :sortable="true" :filter="true" :filterMatchMode="'contains'"></Column>
    </DataTable>
</template>

<script lang="ts" setup>
import { useAuth } from '@/composables/useAuthStore';
import { onMounted, ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const { user } = useAuth();

let name = user.value?.first_name;
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

const columns = [
    { field: 'id', header: 'Id' },
    { field: 'first_name', header: 'First Name' },
    { field: 'username', header: 'Username' },
    { field: 'email', header: 'Email' }
];

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
onMounted(() => {
    FetchUsers();
});


</script>

<style lang="scss" scoped></style>