import { createApp } from './main'
import NProgress from '@/utils/progress'

const { app, router, pinia } = createApp()

router.beforeEach((to: any, from, next) => {
  sessionStorage.setItem('source', to.name?.toUpperCase())
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})
router.isReady().then(() => {
  console.log('window-----from client', window)
  if (window.__INITIAL_STATE__) {
    try {
      pinia.state.value = JSON.parse(window.__INITIAL_STATE__)
    } catch (e) {
      console.log('e.stack', e)
      pinia.state.value = {}
    }
  }

  app.mount('#app')
})
