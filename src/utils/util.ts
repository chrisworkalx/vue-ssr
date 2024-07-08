import dayjs from 'dayjs'

export function getQueryString(name) {
  // 获取URL字符串
  const url = (window || window.top).location.href
  // 找到查询参数开始的位置
  const queryStart = url.indexOf('?')

  if (queryStart === -1) {
    // 如果没有查询参数，则返回null
    return null
  }

  // 截取查询参数部分
  const query = url.slice(queryStart + 1)

  // 将查询参数分割成键值对数组
  const pairs = query.split('&')

  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=')

    // 如果键匹配，返回对应的值
    if (decodeURIComponent(pair[0]) === name) {
      return decodeURIComponent(pair[1] || '')
    }
  }

  // 如果没有找到匹配的键，返回null
  return null
}

export function sortArrByType(arr, key, valueKey) {
  const result = {}

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (result[item[key]]) {
      result[item[key]].push(item[valueKey])
    } else {
      result[item[key]] = [item[valueKey]]
    }
  }

  return result
}

export const formatTime = (
  time: string | number | Date,
  formatType?: string
) => {
  formatType = formatType || 'DD/MM/YYYY'
  const date = new Date(time)
  return dayjs(date).format(formatType)
}

export function selectDefaultValue(
  curSelection: any = {},
  isPass: boolean = false,
  defaultArr: any[] = []
) {
  isPass =
    (curSelection?.children &&
      Array.isArray(curSelection?.children) &&
      curSelection.children.length <= 1) ||
    !curSelection?.children ||
    curSelection?.children.length === 0
  defaultArr.push(curSelection)
  if (
    curSelection?.children &&
    Array.isArray(curSelection?.children) &&
    curSelection?.children?.length === 1
  ) {
    isPass = selectDefaultValue(
      curSelection?.children[0],
      isPass,
      defaultArr
    ).isPass
  }

  return {
    curSelection,
    isPass,
    defaultArr
  }
}

export function deepCloneArr(arr, prevValue = '') {
  const copyArr = JSON.parse(
    JSON.stringify(Array.isArray(arr) ? arr : isEmptyObj(arr) ? [] : [arr])
  )
  for (let i = 0; i < copyArr.length; i++) {
    const item = copyArr[i]

    item.copyValue = item.copyValue || item.value

    item.value = `${prevValue}` + item.value

    if (item.children && Array.isArray(item.children)) {
      item.children = deepCloneArr(item.children, item.value)
    }
  }
  return copyArr
}

export const isEmptyObj = (obj) => {
  return Reflect.ownKeys(obj).length === 0
}
export function getDeepTargetValue(arr, value) {
  arr = Array.isArray(arr) ? arr : isEmptyObj(arr) ? [] : [arr]
  value = arr[0]?.value
  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i]
    if (cur.children && Array.isArray(cur.children)) {
      value = getDeepTargetValue(cur.children, value)
    }
  }
  return value
}

export function montageLabel(str, targetArr = []) {
  str = Array.isArray(str) ? str : isEmptyObj(str) ? [] : [str]
  targetArr = str.reduce((target, nextItem) => {
    target.push(nextItem)
    if (nextItem.children && Array.isArray(nextItem.children)) {
      montageLabel(nextItem.children, targetArr)
    }
    return target
  }, targetArr)
  return targetArr
}

export function px2vw(res) {
  const clientWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  if (!clientWidth) return
  const fontSize = clientWidth / 375
  return res * fontSize
}

export const createUniqName = () => {
  return `hcp-radio-${Date.now()}_${Math.random()}`
}

export const isNotEmpty = (v) => v !== '' && v !== undefined && v !== null

export const setFirstDeepItem = (arr) => {
  arr = Array.isArray(arr) ? arr : [arr]
  return arr.reduce((target, nextItem, nextIndex) => {
    if (nextIndex === 0) {
      target.push(nextItem)
      if (nextItem.children && Array.isArray(nextItem.children)) {
        nextItem.children = setFirstDeepItem(nextItem.children)
      }
    }

    return target
  }, [])
}

export function debounce(fn, time) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(this, ...args)
    }, time)
  }
}
