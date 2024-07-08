<template>
  <div :class="['custom-cell-box', outerClass]">
    <van-field
      :model-value="fieldValue"
      is-link
      readonly
      label=""
      placeholder="请选择"
      @click="show = true"
      arrow-direction="down"
      border
    />
  </div>
  <van-popup
    v-model:show="show"
    round
    position="bottom"
    safe-area-inset-top
    safe-area-inset-bottom
    @opened="handlePopupOpen"
    @close="handlePopupClose"
  >
    <div class="custom-pop-box" ref="customPopRef">
      <van-field
        v-model="searchName"
        placeholder="请输入搜索关键词"
        v-if="showSearch"
      />
      <div style="padding-bottom: 200px; --hcp-van-tab__text-border-width: 3px">
        <slot :hide="cancelPopUp">
          <van-cascader
            ref="cascaderRef"
            :model-value="modelValue"
            @update:model-value="handleEmitCacadeValue"
            :title="cascaderTitle"
            :field-names="fieldNames"
            :options="options"
            @close="show = false"
            @finish="onFinish"
            @change="onChange"
            @click-tab="onClickTab"
            @touchend="(e) => handleTouchEnd(e)"
          >
            <template #options-top="{ tabIndex }">
              <van-field
                v-model="searchName"
                placeholder="请输入搜索关键词"
                v-if="tabIndex === 0"
              />
            </template>
          </van-cascader>
        </slot>
      </div>
    </div>
  </van-popup>
</template>

<script setup lang="ts" name="HcpBasicSearch">
import { ref, computed, watch, onMounted } from 'vue'

import type { CascaderOption, CascaderFieldNames } from 'vant'
import { selectDefaultValue, debounce, isNotEmpty, px2vw } from '@/utils/util'

const props = withDefaults(
  defineProps<{
    fieldNames?: CascaderFieldNames
    options?: CascaderOption[]
    cacheOptions?: CascaderOption[]
    title?: string
    placeholder?: string
    fieldValue?: string | number
    modelValue?: string | number
    defaultOption?: Array<any>
    titleArray?: Array<string>
    isListen?: boolean
    selectLenth?: number
    outerClass?: string
    padding?: string
    fontSize?: string
    showSearch?: boolean
    logPrefix?: Array<string>
  }>(),
  {
    placeholder: '请选择',
    titleArray: () => ['请选择品牌', '请选择品牌family', '请选择适应症'],
    defaultOption: () => [],
    isListen: true,
    options: () => [],
    cacheOptions: () => [],
    selectLenth: 2,
    fontSize: '10px',
    padding: '4px 12px',
    showSearch: false,
    logPrefix: () => []
  }
)

const emits = defineEmits<{
  (e: 'finish', data: any): void
  (e: 'change', data: any): void
  (e: 'click-tab', data: any): void
  (e: 'update:modelValue', data: any): void
  (e: 'open', data?: any): void
  (e: 'close', data?: any): void
  (e: 'search', data?: any): void
}>()

const cascaderRef = ref(null)

const searchName = ref('')

const cancelPopUp = () => (show.value = false)

const cascaderTitle = computed(() => {
  return props.title || props.titleArray[curTabIndex.value]
})

const curTabIndex = ref(0)

const customPopRef = ref(null)

const show = ref(false)

const isPopup = ref(false)

const inputCellFont = ref('10px')

onMounted(() => {
  inputCellFont.value = px2vw(props.fontSize?.replace('px', '')) + 'px'
})

function handlePopupOpen() {
  isPopup.value = true
  emits('open')
}

function handlePopupClose() {
  isPopup.value = false
  emits('close')
}

const handleTouchEnd = (event) => {
  const customRefDom = customPopRef.value
  const allPopTextDom = customRefDom.querySelectorAll('.van-tab')
  if (allPopTextDom) {
    ;[...allPopTextDom].forEach((node, index) => {
      if (node && node.classList.contains('van-tab--active')) {
        curTabIndex.value = index
      }
    })
  }
}

// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ selectedOptions, ...rest }) => {
  show.value = false
  const fieldValueText = selectedOptions.map((option) => option.label).join('/')
  emits('finish', {
    fieldValue: fieldValueText,
    selectedOptions,
    rest
  })
}

const onChange = ({ tabIndex, ...rest }) => {
  const selectedOptions = rest.selectedOptions

  const firstSelectOption = selectedOptions[0]

  if (tabIndex < props.selectLenth) {
    const { defaultArr, isPass } = selectDefaultValue(firstSelectOption)

    if (defaultArr?.length > 1 || isPass) {
      const deepValue = defaultArr?.[defaultArr.length - 1].value

      emits('change', {
        tabIndex,
        rest,
        deepValue,
        combineValue: defaultArr
      })
    } else {
      const _tabIndex =
        tabIndex + 1 >= props.selectLenth ? props.selectLenth : tabIndex + 1
      curTabIndex.value = _tabIndex
    }
  }
}

const onClickTab = (tabIndex) => {
  curTabIndex.value = tabIndex
  emits('click-tab', tabIndex)
}

const handleListenSearchName = debounce((name) => {
  emits('search', {
    name,
    isSearch: isNotEmpty(name)
  })
}, 200)

watch(
  () => props.defaultOption,
  (v) => {
    if (v.length > 0) {
      const _index =
        v.length - 1 === props.selectLenth ? props.selectLenth : v.length
      curTabIndex.value = _index
    }
  },
  { deep: true }
)

watch(() => searchName.value, handleListenSearchName)

const handleEmitCacadeValue = (v) => {
  emits('update:modelValue', v)
}
</script>

<style scoped lang="less">
.custom-pop-box {
  ::v-deep(.van-picker-column__item--selected) {
    color: var(--van-picker-confirm-action-color);
  }
  ::v-deep(.van-tabs__wrap) {
    .van-tab {
      width: 33%;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
    .van-tabs__line {
      display: none;
    }
    .van-tab--active {
      .van-tab__text {
        padding: 0 4px 6px 4px;
        border-bottom: solid var(--van-primary-color)
          var(--hcp-van-tab__text-border-width);
      }
    }
  }
}

.custom-cell-box {
  width: 100%;
  margin-bottom: 12px;
  ::v-deep(.van-cell) {
    border-radius: 2px;
    border: 1px solid #cccccc;
    padding: v-bind(padding);
    box-sizing: border-box;
    .van-cell__value {
      font-weight: 400;
      font-size: v-bind(inputCellFont);
      color: #3c4242;
      height: 16px;
      line-height: 16px;
    }
    .van-icon {
      font-size: 12px;
      height: 16px;
      line-height: 16px;
    }
  }
}
</style>
