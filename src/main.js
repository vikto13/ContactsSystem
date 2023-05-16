import Vue from 'vue';
import App from './App.vue';
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRouter from 'vue-router';
import Vuex from 'vuex'
import { router } from './router/router';


Vue.use(VueMaterial)
Vue.use(VueRouter);
Vue.use(Vuex);


new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
