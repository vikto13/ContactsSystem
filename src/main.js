import Vue from 'vue';
import App from './App.vue';
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';
import VueDatePicker from '@mathieustan/vue-datepicker';
import VueRouter from 'vue-router';
import vueDebounce from 'vue-debounce'
import Vuex from 'vuex'
import { router } from './router/router';
import { initializeStore } from './store/initializeStore';



Vue.use(Vuex);
Vue.use(vueDebounce, {
    listenTo: ['input']
});
Vue.use(VueMaterial)
Vue.use(VueRouter);
Vue.use(VueDatePicker);

export const store = new Vuex.Store(initializeStore)

new Vue({
    store,
    router,
    render: (h) => h(App),
}).$mount('#app');
