export function getDeepTargetValue(arr, value) {
  arr = Array.isArray(arr) ? arr : [arr]
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
  str = Array.isArray(str) ? str : [str]
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

export function deepCloneArr(arr, prevValue = '') {
  const copyArr = JSON.parse(JSON.stringify(Array.isArray(arr) ? arr : [arr]))
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

export function sortData(arr) {
  const targetArr = []
  arr.forEach((item) => {
    targetArr.push(item)
  })
  return targetArr
}

export function serializeData(arr) {
  const sortArr = sortData(arr)
  const mapData = new Map()
  for (let i = 0; i < sortArr.length; i++) {
    const item = sortArr[i]
    if (!mapData.get(item.contentCategory)) {
      mapData.set(item.contentCategory, [item])
    } else {
      mapData.get(item.contentCategory).push(item)
    }
  }
  return mapData
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

export function collectFirstArrItem(arr, obj = {}) {
  return arr.reduce((target, nextItem, index) => {
    if (index === 0) {
      target = nextItem
      if (nextItem.children && Array.isArray(nextItem.children)) {
        target.children = [collectFirstArrItem(nextItem.children, {})]
      }
    }
    return target
  }, obj)
}
