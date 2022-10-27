import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ViewBook from '../views/ViewBook.vue'
import EditBook from '../views/EditBook.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/book-view/:slug',
    name: 'ViewBook',
    component: ViewBook
  },
  {
    path: '/book-edit/:slug',
    name: 'EditBook',
    component: EditBook
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
