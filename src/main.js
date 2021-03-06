// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import $ from 'zepto-webpack/zepto'       
import router from './router'
import axios from 'axios'
import VueResource from 'vue-resource';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueLazyload from 'vue-lazyload';
// import FastClick from 'fastclick';
// FastClick.attach(document.body);
Vue.use(VueResource)
 import 'swiper/dist/css/swiper.css'
Vue.use(VueLazyload)
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
