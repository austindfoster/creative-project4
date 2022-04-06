import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CSView from '../views/CSView.vue'
import AnimView from '../views/AnimView.vue'
import AboutView from '../views/About.vue'
import AdminView from '../views/Admin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cs',
    name: 'cs',
    component: CSView
  },
  {
    path: '/animation',
    name: 'animation',
    component: AnimView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
