import {
  createRouter as _createRrouter,
  createMemoryHistory,
  createWebHistory,
  RouteRecordRaw,
  type RouteLocationNormalized
} from 'vue-router'

import routes from './routes'

// const routes: RouteRecordRaw[] = [
//   {
//     path: '/',
//     component: () => import('@/pages/home.vue')
//   },
//   {
//     path: '/about',
//     component: () => import('@/pages/about.vue')
//   }
// ]

export function createRouter() {
  const router = _createRrouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })

  return router
}

export interface toRouteType extends RouteLocationNormalized {
  meta: {
    title?: string
    noCache?: boolean
  }
  name: string
}
