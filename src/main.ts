import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import { i18n } from '@/lang/index'

import '@/assets/css/index.scss'

const app = createApp(App)
app.use(i18n)
app.use(router)
app.use(PrimeVue)
app.mount('#app')
