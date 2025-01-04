import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import AppDetail from './views/AppDetail.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/app/:id', component: AppDetail, props: true },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router