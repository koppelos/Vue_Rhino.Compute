import './styles/main.css';
import './styles/base.css';
import './styles/neumorphic-light.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; 

createApp(App).use(router).mount('#app');

