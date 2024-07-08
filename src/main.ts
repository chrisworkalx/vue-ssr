import { createSSRApp } from 'vue'

import App from './App.vue'
import { createRouter } from './router'
import { store } from './store'
import Vant from 'vant'

import 'vant/lib/index.css'
import 'normalize.css/normalize.css'
import './style.css'

// tailwindcss
import './styles/tailwind.css'
// svg icon
import 'virtual:svg-icons-register'

import SvgIcon from './components/SvgIcon/index.vue'

export function createApp() {
  const app = createSSRApp(App)
  const router = createRouter()
  const pinia = store

  app.component('SvgIcon', SvgIcon)
  app.use(router)
  app.use(pinia)
  app.use(Vant)
  return { app, router, pinia }
}
