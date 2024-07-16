import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: './start-server.js', // 这里指定你要打包的文件路径
      output: {
        file: 'dist/start-server.js', // 打包后输出的文件
        format: 'cjs' // 可根据需求选择输出格式，如 es, cjs, umd 等
      },
      external: [
        // 'path',
        // 'url',
        'module' // 确保 Rollup 不会尝试打包这个模块
      ]
    }
  }
})
