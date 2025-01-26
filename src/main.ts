import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import { i18n } from '@/lang/index'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueCropper from 'vue-cropper'
import vLazy from '@/directives/lazyLoad'

import 'vue-cropper/dist/index.css'
import '@/assets/css/index.scss'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(i18n)
app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.use(ConfirmationService)
app.use(VueCropper)

app.directive('lazy', vLazy)

app.config.globalProperties.$t = i18n.global.t

app.mount('#app')
