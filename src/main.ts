import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { MockXHR } from '../mock';

MockXHR();
createApp(App).use(router).mount('#app');
