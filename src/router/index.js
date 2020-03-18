import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../components/Welcome'
import User from '../components/User'
import Home from '../components/Home'
import NotFound from '../components/NotFound'
import firebase from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Welcome
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  /**
     * Dynamic import利用は下記2点必須(babel-eslintだけでもいいかも)
     * npm install -D babel-eslint
     * npm install -D eslint eslint-plugin-vue
     */
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "login" */ '../components/Login')
  // },
  // {
  //   path: '/init',
  //   name: 'Init',
  //   component: Init,
  //   meta: { requiresAuth: true }
  // },
  {
    path: '/home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/user/:accountId',
    component: User
  },
  {
    path: '*',
    component: NotFound,
    title: '404 Not Found'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Global Before Guards
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  // firebaseでログイン中のユーザーを取得
  firebase.auth().onAuthStateChanged(user => {
    if (requiresAuth) {
      // ログインユーザーか判定
      if (user) {
        next()
      // 認証が必要なページはrootにリダイレクト
      } else {
        next({
          path: '/'
          // query: { redirect: to.fullPath }
        })
      }
    } else {
      next()
    }
  })
})

export default router
