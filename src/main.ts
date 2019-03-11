import Vue from 'vue';
import App from './App.vue';
import store from './store/index';
import './registerServiceWorker';
import './assets/css/tachyons.min.css';
import './assets/css/main.scss';
Vue.config.productionTip = false;

new Vue({
    store,
    render: (h) => h(App),
}).$mount('#app');
