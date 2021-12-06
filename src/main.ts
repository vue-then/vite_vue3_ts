import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import i18n from '@/i18n'

import api from './service/api/api'
import DonMessage from '@/components/message'

const app = createApp(App)

app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(i18n)
app.use(router)
app.use(createPinia())

//全局配置Axios
//declare module '@vue/runtime-core' {
//    interface ComponentCustomProperties {
//      $axios: AxiosInstance;
//    }
//}
app.config.globalProperties.$api= api;  
app.config.globalProperties.$message = new DonMessage();



app.mount('#app')
