import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import StripeTest from './views/StripeTest'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/h',
      name: 'home',
      component: Home
    },
    {
      path: '/',
      name: 'stripe test',
      component: StripeTest
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
