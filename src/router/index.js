import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(["@/components/home"],resolve)
    },
    {
      path: '/checkoutsuc',
      name: 'checkoutsuc',
      component: resolve => require(["@/components/checkoutsuc/checkoutsuc"],resolve)
    },
    {
      path: '/orderlist',
      name: 'orderlist',
      component: resolve => require(["@/components/order/orderlist"],resolve)
    },
    {
      path: '/cancel',
      component: resolve => require(["@/components/order/cancel"],resolve)
    },
    {
      path: '/complaint',
      component:resolve => require(["@/components/order/complaint"],resolve)
    },
    {
      path: '/confirm',
      component:resolve => require(["@/components/confirm/"],resolve)
    },
    {
      path: '/okami',
      component:resolve => require(["@/components/okami/"],resolve)
    },
    {
      path: '/place',
       component:resolve => require(["@/components/place/"],resolve)
    },
    {
      path: '/sparringdetails',
      component:resolve => require(["@/components/sparringdetails/"],resolve)
      },
      {
        path: '/sdetails',
        component:resolve => require(["@/components/sdetails/"],resolve)
      },
     {
      	path: '/playlist',
	      name: 'playlist',
	      component:resolve => require(["@/components/playlist/"],resolve)
      },
      {
      	path: '/sparringlist',
	      name: 'sparringlist',
	      component:resolve => require(["@/components/sparringlist/"],resolve)
      },
  ]
})
