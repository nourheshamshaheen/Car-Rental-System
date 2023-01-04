/* eslint-disable */ 
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'
import VueRouter from 'vue-router'
import {store} from './store';
import {routes} from './routes';
Vue.use(Vuetify);
Vue.use(Vuelidate);
Vue.use(require('vue-cookies'))
export default new Vuetify({
  icons:{
    iconfont:'mdiSvg'
  }
})

const router = new VueRouter({
  routes,
  mode: 'history',
});
router.beforeEach((to,from,next)=>{
  if((to.name=="login" || to.name=="signup") && $cookies.isKey("user")){
    next("/browsing");
  }
  else{
    next();
  }
  if((to.name=="reserve" || to.name=="reservations" ||to.name=="receipt") && !$cookies.isKey("user")){
    next("/");
  }else{
    next();
  }
  if((to.name=="admin" || to.name=="addCar" || to.name=="updateCarStatus" || to.name=="advancedSearch" || to.name=="reservedCar" || to.name=="periodInfo" || to.name=="customerInfo" || to.name== "dailyPayments" ||to.name=="carStatus") && !$cookies.isKey("admin")){
    next("/");
  }else{
    next();
  }
})
Vue.use(VueRouter);
new Vue({
  vuetify: new Vuetify(),
  store,
  router,
  el: '#app',
  render: h => h(App)
})
