import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import QrcodeVue from 'qrcode-vue'
import 'bulma/css/bulma.min.css'
import './registerServiceWorker.js'

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.component('qrcode-vue', QrcodeVue)
app.mount('#app');