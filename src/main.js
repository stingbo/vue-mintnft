import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'
import Web3 from 'web3'

createApp(App).use(router, Web3).mount('#app')