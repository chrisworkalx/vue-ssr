import { defineConfig } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
// import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
// import replace from '@rollup/plugin-replace'

// rollup.config.js
const config = {
  input: './start-server.js', // 入口文件
  //   external: ['module'], // 排除的依赖包
  output: {
    // name: 'index',
    file: 'rc-start-server.js', // 打包后的index文件
    format: 'es', // umd格式 可换成 iife
    //   globals: {
    //     vue: 'Vue',
    //     jquery: '$'
    //   },
    inlineDynamicImports: true
  },
  plugins: [
    nodeResolve(), // 解析 node_modules 中的模块
    commonjs(), // 转换 CommonJS 模块为 ES6
    // babel({
    //   exclude: 'node_modules/**', // 排除 node_modules 目录
    //   babelHelpers: 'bundled' // 使用打包后的 Babel helpers
    // }),
    terser(), // 压缩输出文件
    json() // 支持导入 JSON 文件
    // replace({
    //   'process.env.NODE_ENV': JSON.stringify('production') // 替换环境变量
    // })
  ]
}

export default defineConfig(config)
