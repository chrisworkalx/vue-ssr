import { onMounted, Ref, unref, onBeforeUnmount, ref } from 'vue'
import echarts from './library'
// import type { EChartsOption } from 'echarts'
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers'
import { RenderType, ThemeType } from './echart-type'

export function useECharts(
  elparams: Ref<HTMLDivElement> | HTMLDivElement,
  autoUpdateSize: boolean = false,
  render: RenderType = RenderType.SVGRenderer,
  theme = ThemeType.Default,
  animation = true
) {
  // 渲染模式
  echarts.use(render === RenderType.SVGRenderer ? SVGRenderer : CanvasRenderer)

  // echats实例
  let echartsInstance: echarts.ECharts | null = null

  const resizeEl = ref(null)

  // 初始化 echats实例
  function initCharts() {
    const el = unref(elparams)

    if (!el) return

    echartsInstance = echarts.init(el, theme)
  }

  // 配置
  function setOption(option: any, extra = {}) {
    showLoading()

    if (!echartsInstance) initCharts()
    if (!echartsInstance) {
      hideLoading()
      return
    }
    echartsInstance.setOption(option, extra)

    hideLoading()
  }

  // 获取 echats实例
  function getInstance() {
    if (!echartsInstance) initCharts()

    return echartsInstance
  }

  // 更新大小
  function onResize() {
    echartsInstance?.resize()
  }

  // 监听元素大小变化
  function watchEl() {
    if (animation) unref(elparams).style.transition = 'width 1s, height 1s'

    resizeEl.value = new ResizeObserver(() => onResize())

    resizeEl.value.observe(unref(elparams))
  }

  // 显示加载状态
  function showLoading() {
    if (!echartsInstance) initCharts()

    echartsInstance?.showLoading({
      text: '加载中...',
      color: '#409eff',
      textColor: '#000',
      maskColor: 'rgba(255, 255, 255, .95)',
      zlevel: 0,
      fontSize: 10,
      lineWidth: 2
    })
  }

  // 隐藏加载状态
  function hideLoading() {
    if (!echartsInstance) initCharts()

    echartsInstance?.hideLoading()
  }

  // 生命钩子——组件挂载完成
  onMounted(() => {
    window.addEventListener('resize', onResize)

    if (autoUpdateSize) watchEl()
  })

  // 生命钩子——页面销毁
  onBeforeUnmount(() => {
    if (echartsInstance) {
      echartsInstance.dispose()
      echartsInstance = null
    }
    if (resizeEl.value) {
      resizeEl.value.disconnect()
      resizeEl.value = null
    }
    window.removeEventListener('resize', onResize)
  })

  return { setOption, getInstance }
}
