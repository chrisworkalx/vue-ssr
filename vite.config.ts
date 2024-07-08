import { defineConfig } from 'vite'
import path from 'path'
import { createPlugins } from './build/plugin'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: createPlugins(),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.ts', '.js']
  },
  server: {
    host: true,
    port: 9527,
    // 仅在 proxy 中配置的代理前缀， mock-dev-server 才会拦截并 mock
    // doc: https://github.com/pengzhanbo/vite-plugin-mock-dev-server
    proxy: {
      '^/hcp360_api': {
        target:
          'https://ppd.datahub.astrazeneca.cn:443/api/c2/exp/china-hcp360-proxy-api/v1',
        // target: "http://hcp360.bf.zjwji.top/",
        changeOrigin: true
      }
    }
  }
})
