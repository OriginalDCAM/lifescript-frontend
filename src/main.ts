import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'

import './assets/main.css'

// Theme import PrimeVue
import "primevue/resources/themes/lara-light-teal/theme.css"

// PrimeVue CSS import
import "primevue/resources/primevue.min.css"
import 'primeicons/primeicons.css';


const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(PrimeVue)

app.mount('#app')
