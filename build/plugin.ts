import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import viteCompression from 'vite-plugin-compression'
// import ssr from 'vite-plugin-ssr/plugin'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export function createPlugins() {
  const defaultPlugins = [
    vue(),
    vueJsx(),
    // ssr(),
    // svg icon
    createSvgIconsPlugin({
      // 指定图标文件夹
      iconDirs: [path.join(__dirname, '..', 'src/icons/svg')],
      // 指定 symbolId 格式
      symbolId: 'icon-[dir]-[name]'
    }),
    // 允许 setup 语法糖上添加组件名属性
    vueSetupExtend(),
    // 生产环境 gzip 压缩资源
    viteCompression()
  ]

  return defaultPlugins
}
