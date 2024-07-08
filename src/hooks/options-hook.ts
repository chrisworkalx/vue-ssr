import { ref, watch, toRaw, onMounted } from 'vue'

import { getSelectList } from '@/api/index'

import { useCommonWorker } from '@/hooks/worker-common'

import BaseWorkerTwo from '@/workers/base.worker.ts?worker'

export const setArrItemId = (arr) => {
  arr.forEach((item, index) => {
    item.id = item.id || index
  })
}

export function useToGetOptions(
  dimType: string,
  initFetch: any = '',
  isReturnOptionKey: boolean = true,
  lazyCallBack?: Function
) {
  const defaultOption = ref<Array<any>>([])
  const cascaderValue = ref<string | number>('')
  const options = ref<any[]>([])
  const cacheOptions = ref<any>([])
  const fieldValue = ref<string | number>('')
  const searchFirstValue = ref<string | number>('')
  const searchSecondValue = ref<string | number>('')
  const searchThirdValue = ref<string | number>('')
  const fieldNames = {
    text: 'label',
    value: 'value',
    children: 'children'
  }
  const { result, startWorker } = useCommonWorker(BaseWorkerTwo) as any

  watch(
    () => result.init,
    (n) => {
      const plainObject = toRaw(n)
      cascaderValue.value = plainObject.cascaderValue
      options.value = plainObject.options
      cacheOptions.value = plainObject.cacheOptions
      fieldValue.value = plainObject.fieldValue
      defaultOption.value = plainObject.defaultOption
      searchFirstValue.value = plainObject.searchFirstValue
      searchSecondValue.value = plainObject.searchSecondValue
      searchThirdValue.value = plainObject.searchThirdValue
      if (lazyCallBack && typeof lazyCallBack === 'function') {
        lazyCallBack({
          lazyOption: defaultOption,
          values: [
            searchFirstValue.value,
            searchSecondValue.value,
            searchThirdValue.value
          ]
        })
      }
    },
    { deep: true }
  )

  //初始化第一次进入 相关参数赋值
  async function getOptions() {
    let fetchAPI = async () => await getSelectList({ dimType })

    if (initFetch && typeof initFetch === 'function') {
      fetchAPI = initFetch
    }
    const res = await fetchAPI()

    startWorker({
      ...(res || {}),
      singleResData: res,
      isReturnOptionKey,
      type: 'init'
    })
  }

  onMounted(() => {
    getOptions()
  })

  return {
    cascaderValue,
    options,
    fieldValue,
    defaultOption,
    searchFirstValue,
    searchSecondValue,
    searchThirdValue,
    fieldNames,
    cacheOptions,
    startWorker,
    result
  }
}
