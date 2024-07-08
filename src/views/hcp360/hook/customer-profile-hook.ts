import { ref, watch, Ref, unref, toRaw, nextTick, onMounted } from 'vue'
import { getAccessPotentialAndSupport, getCustomerPortrait } from '@/api/index'
import { useToGetOptions } from '@/hooks/options-hook'
import { useCommonHook } from '@/store/modules/common'
import { isNotEmpty } from '@/utils/util'

const isEmpty = (v) => v === '' || v === null || v === undefined

const mapRecordType = {
  内容: 'e学荟阅读',
  拜访: '代表拜访',
  会议: '参会'
}

const mapLevel = {
  高: '前20%',
  中: '前21%~40%',
  低: '后60%',
  '-': ''
}
type Level = '高' | '中' | '低' | '-'
type RecoverType = '内容' | '拜访' | '会议'

const setToolTip = (level: Level, type: RecoverType) => {
  return level !== '-'
    ? `该客户在半年内${mapRecordType[type]}总次数在所有客户中排名${mapLevel[level]}`
    : ''
}
export const useCustomerProfile = () => {
  const commonStote = useCommonHook()
  const activeName = ref(['客户画像'])
  const isOnSearch = ref(false)
  const {
    cascaderValue,
    options,
    cacheOptions,
    fieldValue,
    fieldNames,
    searchFirstValue,
    searchSecondValue,
    searchThirdValue,
    defaultOption
  } = useToGetOptions('persona')

  const cardList: Ref<any> = ref([
    {
      cardBg: 'card1',
      title: '潜力',
      value: '-',
      placement: 'right',
      tooltip: '显示当前选择的适应症的潜力，默认显示最高潜力适应症对应的潜力'
    },
    {
      cardBg: 'card2',
      title: '支持度',
      value: '-',
      tooltip:
        '显示当前选择的适应症的支持度，默认显示最高潜力适应症对应的支持度',
      placement: 'right'
    },
    {
      cardBg: 'card3',
      title: '渠道偏好',
      value: '-',
      tooltip: '基于客户半年内e学荟阅读和参与会议的行为数据分析得出',
      placement: 'left'
    },

    {
      cardBg: 'card4',
      title: '拜访覆盖',
      value: '-',
      tooltip: '',
      isLargerCard: true,
      placement: 'right'
    },
    {
      cardBg: 'card5',
      title: '文章覆盖',
      value: '-',
      tooltip: '',
      isLargerCard: true,
      placement: 'left'
    },
    {
      cardBg: 'card6',
      title: '会议覆盖',
      value: '-',
      tooltip: '',
      placement: 'right',
      isLargerCard: true
    },
    {
      cardBg: 'card7',
      title: '调研填写比例',
      value: '-',
      icon: 'hcp-h5-edit',
      tooltip: '基于该客户今年所有渠道的调研结果填写情况计算得出',
      isLargerCard: true,
      placement: 'left'
    }
  ])

  function setCardValue(value) {
    return value === '' || value === undefined || value === null ? '-' : value
  }

  function getTargetTypeToValue(arr, key) {
    const obj = arr.find((item) => item.coverageType === key) || {}
    return setCardValue(obj?.result)
  }

  const handleSearch = ({ name, isSearch }) => {
    const _options = isNotEmpty(name)
      ? cacheOptions.value.filter((item) => item?.label?.includes(name))
      : JSON.parse(JSON.stringify(cacheOptions.value))
    options.value = _options
    isOnSearch.value = isSearch
    cascaderValue.value = ''
  }

  const handleFinish = ({ selectedOptions }) => {
    const selectValues = selectedOptions.map((s) => s.copyValue)
    const fieldValueText = selectedOptions
      .map((option) => option.label)
      .join('-')
    fieldValue.value = fieldValueText
    searchFirstValue.value = selectValues[0]
    searchSecondValue.value = selectValues[1]
    searchThirdValue.value = selectValues[2]
  }

  const handleChange = ({ deepValue, combineValue }) => {
    cascaderValue.value = ''
    nextTick(() => {
      defaultOption.value = combineValue
      cascaderValue.value = deepValue
      const fieldValueText = combineValue
        .map((option) => option.label)
        .join('-')
      fieldValue.value = fieldValueText
      searchFirstValue.value = combineValue[0]?.copyValue || ''
      searchSecondValue.value = combineValue[1]?.copyValue || ''
      if (combineValue?.length === 3) {
        searchThirdValue.value = combineValue[2]?.copyValue || ''
      }
    })
  }

  const handleClickTab = (v) => {
    // console.log("v----click-tab", v);
  }

  //获取客户画像 潜力和支持度
  async function getAccessPotentialAndSupportApi(value) {
    if (!isEmpty(value)) {
      const res = await getAccessPotentialAndSupport({
        brandId: searchFirstValue.value,
        familyId: searchSecondValue.value,
        indicationId: value
      })

      cardList.value[0].value = setCardValue(res?.potential)
      cardList.value[1].value = setCardValue(res?.supportingLevel)
      commonStote.setPotential(setCardValue(res?.potential))
    }
  }

  function setPercentage(v) {
    return typeof v === 'number' && v !== 0 ? v + '%' : v
  }

  //其他类型
  async function getCustomerPortraitApi() {
    const res = await getCustomerPortrait()
    const overlayTypeList = res?.overlayTypeList || []
    const preferenceResult = setCardValue(res?.preferenceResult)
    const surveyCoverage = setCardValue(res?.surveyCoverage)
    cardList.value[2].value = preferenceResult
    cardList.value[6].value = setPercentage(surveyCoverage)

    const value3 = getTargetTypeToValue(overlayTypeList, '拜访')
    const value4 = getTargetTypeToValue(overlayTypeList, '内容')
    const value5 = getTargetTypeToValue(overlayTypeList, '会议')
    //设置value
    cardList.value[3].value = value3
    cardList.value[4].value = value4
    cardList.value[5].value = value5

    //设置tooltip
    cardList.value[3].tooltip = setToolTip(value3, '拜访')
    cardList.value[4].tooltip = setToolTip(value4, '内容')
    cardList.value[5].tooltip = setToolTip(value5, '会议')
  }

  onMounted(() => {
    getCustomerPortraitApi()
  })
  watch(
    () => searchThirdValue,
    (v) => {
      getAccessPotentialAndSupportApi(unref(v))
    },
    {
      deep: true
    }
  )
  return {
    activeName,
    fieldValue,
    cardList,
    cascaderValue,
    options,
    fieldNames,
    handleFinish,
    handleChange,
    handleClickTab,
    defaultOption,
    handleSearch
  }
}
