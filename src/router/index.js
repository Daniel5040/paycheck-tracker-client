import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters.isLoggedIn) next({ name: 'Login' })
      else next()
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/paycheck/create',
    name: 'Create',
    component: () => import('@/views/Create.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters.isLoggedIn) next({ name: 'Login' })
      else next()
    }
  },
  {
    path: '/paychecks',
    name: 'Paychecks',
    component: () => import('@/views/Paychecks.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters.isLoggedIn) next({ name: 'Login' })
      else next()
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters.isLoggedIn) next({ name: 'Login' })
      else next()
    }
  },
  {
    path: '/paychecks/detail/:id',
    name: 'PaycheckDetail',
    component: () => import('@/views/PaycheckDetail.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters.isLoggedIn) next({ name: 'Login' })
      else next()
    }
  },
  // catch all 404
  {
    path: '*',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
