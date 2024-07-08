import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'root',
    component: Layout,
    redirect: { path: 'hcp360' },
    children: [
      {
        path: 'about',
        name: 'About',
        component: () => import('@/pages/about.vue')
      },
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/pages/home.vue')
      },
      {
        path: 'hcp360',
        name: 'Hcp360',

        component: () => import('@/views/hcp360/index.vue'),
        meta: {
          title: 'Hcp360'
        }
      },
      {
        path: 'kee360',
        name: 'Kee360',

        component: () => import('@/views/kee360/index.vue'),
        meta: {
          title: 'Kee'
        }
      }
    ]
  }
]

export default routes
