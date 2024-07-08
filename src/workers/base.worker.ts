import { getDeepTargetValue } from '@/views/hcp360/utils'

import { deepCloneArr, montageLabel, setFirstDeepItem } from '@/utils/util'

function useFormatData(res: any) {
  let defaultOption = [],
    cascaderValue = '',
    options = [],
    cacheOptions = [],
    fieldValue = '',
    searchFirstValue = '',
    searchSecondValue = '',
    searchThirdValue = '',
    isReturnOptionKey = res.isReturnOptionKey

  const optionArr = isReturnOptionKey
    ? res.brandList || []
    : res.singleResData || []
  const deepOptionArr = deepCloneArr(optionArr)
  options = deepOptionArr
  cacheOptions = deepOptionArr
  const selectDefaultOption = res?.defaultBrand
    ? deepCloneArr(res.defaultBrand)
    : setFirstDeepItem(deepOptionArr)

  const defaultValue = getDeepTargetValue(selectDefaultOption, '')
  const plainDefaultArray = montageLabel(selectDefaultOption) as Array<any>
  defaultOption = plainDefaultArray || []
  cascaderValue = defaultValue
  fieldValue = plainDefaultArray.map((i) => i.label).join('-')
  searchFirstValue = plainDefaultArray[0]?.copyValue || ''
  searchSecondValue = plainDefaultArray[1]?.copyValue || ''
  searchThirdValue = plainDefaultArray[2]?.copyValue || ''

  return {
    cascaderValue,
    options,
    cacheOptions,
    fieldValue,
    defaultOption,
    searchFirstValue,
    searchSecondValue,
    searchThirdValue
  }
}

function useChangeFormatData({ cacheOptions, curOptions, isOnSearch }: any) {
  const _cacheOptions = JSON.parse(JSON.stringify(cacheOptions))
  const _curOptions = JSON.parse(JSON.stringify(curOptions))
  const changedCacheOptions = deepCloneArr(_cacheOptions)
  return {
    optionData: isOnSearch ? deepCloneArr(_curOptions) : changedCacheOptions,
    cacheOptionData: changedCacheOptions
  }
}

// worker.js
self.onmessage = async function (e) {
  const data = e.data
  const { type, ...res } = data
  let formatData = {} as any

  switch (type) {
    case 'init':
      const {
        cascaderValue,
        options,
        cacheOptions,
        fieldValue,
        defaultOption,
        searchFirstValue,
        searchSecondValue,
        searchThirdValue
      } = useFormatData(res)

      formatData = {
        type: 'init',
        originData: {
          cascaderValue,
          options,
          cacheOptions,
          fieldValue,
          defaultOption,
          searchFirstValue,
          searchSecondValue,
          searchThirdValue
        }
      }
      break

    case 'change':
      const changeData = useChangeFormatData(res)
      formatData = {
        type: 'change',
        originData: changeData
      }
      break
  }

  self.postMessage(formatData)
}
