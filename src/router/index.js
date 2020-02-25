import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../components/Welcome'
import Init from '../components/Init'
import Home from '../components/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/login',
    name: 'Login',
    /**
     * Dynamic import利用は下記2点必須(babel-eslintだけでもいいかも)
     * npm install -D babel-eslint
     * npm install -D eslint eslint-plugin-vue
     */
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../components/Login')
  },
  {
    path: '/init',
    name: 'Init',
    component: Init
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
