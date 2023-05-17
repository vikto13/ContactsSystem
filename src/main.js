import Vue from 'vue';
import App from './App.vue';
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRouter from 'vue-router';
import Vuex from 'vuex'
import { router } from './router/router';
import { initializeStore } from './store/initializeStore';


Vue.use(VueMaterial)
Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store(initializeStore)

new Vue({
    store,
    router,
    render: (h) => h(App),
}).$mount('#app');
