<template>
  <div class="hcp-h5-collapse-box">
    <van-collapse
      :model-value="modelValue"
      @update:model-value="handleUpdateActiveName"
      @change="handleChange"
    >
      <van-collapse-item :name="tabName" :readonly="readonly">
        <template #title>
          <div class="header-wrapper" @click="handleHeaderClick">
            <div class="text-wrapper">
              <svg-icon
                :name="`${headerIcon}`"
                class="header-icon"
                v-if="headerIcon"
              ></svg-icon>
              <span class="header-title">{{ headerTitle }}</span>
            </div>
            <div class="flex-1 right-header" :style="rightStyle">
              <slot name="right-header">
                <div class="click_icon">
                  <van-popover
                    v-model:show="showPopover"
                    :placement="placement"
                    :show-arrow="false"
                    v-if="tooltip"
                  >
                    <div class="popover-text">{{ tooltip }}</div>
                    <template #reference>
                      <svg-icon name="hcp-h5-info" class="mark-title-info" />
                    </template>
                  </van-popover>
                </div>
              </slot>
            </div>
          </div>
        </template>
        <template #right-icon>
          <div class="custom-right-title" v-if="!props.readonly">
            <van-icon
              :name="collapseTitle === '收起' ? 'arrow-up' : 'arrow-down'"
            />
            <span>{{ collapseTitle }}</span>
          </div>
        </template>
        <div
          class="flex"
          style="justify-content: space-between; flex-wrap: wrap"
          v-if="show"
        >
          <slot name="content"></slot>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref, CSSProperties, watch } from 'vue'
import { postLogAdd } from '@/api'
import type { PopoverPlacement } from 'vant'

const showPopover = ref(false)
const props = withDefaults(
  defineProps<{
    headerIcon: string
    headerTitle: string
    rightStyle?: CSSProperties
    modelValue: any
    tabName: string
    readonly?: boolean
    tooltip?: string
    placement?: PopoverPlacement
  }>(),
  {
    readonly: false,
    placement: 'right'
  }
)

const collapseTitle = ref('收起')

watch(
  () => props.readonly,
  (v) => {
    if (v) {
      collapseTitle.value = ''
    }
  },
  { flush: 'post', immediate: true }
)

watch(
  () => props.modelValue,
  (v) => {
    const behavior = props.tabName + (v.length ? '展开' : '收起')
    postLogAdd({
      behavior
    })
  }
)

const emits = defineEmits<{
  (e: 'update:modelValue', data: any): void
}>()

const show = ref(true)

const handleUpdateActiveName = (v) => {
  emits('update:modelValue', v)
}

const handleChange = (rest) => {
  collapseTitle.value = rest.length ? '收起' : '展开'
}

const handleHeaderClick = (e) => {
  if (
    e.target.classList.contains('mark-title-info') ||
    e.target.classList.contains('click_icon')
  ) {
    e.stopPropagation()
    return false
  }
}
</script>

<style scoped lang="less">
::v-deep(.van-popover__content) {
  .popover-text {
    max-width: 180px;
    background: linear-gradient(180deg, #f5f7f6 0%, #ffffff 100%);
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    font-weight: 400;
    font-size: 8px;
    color: #8a8e8e;
    line-height: 12px;
    padding: 12px;
  }
}

.hcp-h5-collapse-box {
  width: 343px;
  padding: 10px 16px;
  margin: 0 auto 16px auto;
  opacity: 1;
  border-radius: 8px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 16px rgba(61, 100, 157, 0.1);
  .custom-right-title {
    font-size: 12px;
    color: #8a8e8e;
  }
  ::v-deep(.van-collapse) {
    &.van-hairline--top-bottom:after {
      border-width: 0;
    }
    .van-collapse-item__title {
      padding: 0;
      border-bottom: solid 1px #e7e7e8;
      .van-icon {
        font-size: 12px;
        color: #8a8e8e;
        margin-right: 4px;
      }
    }
    .van-collapse-item__content {
      padding-left: 0;
      padding-right: 0;
      padding-bottom: 0;
    }

    .van-collapse-item {
      .van-collapse-item__title--expanded:after {
        border-width: 0;
      }
      .van-collapse-item__wrapper {
        overflow: visible;
        .van-collapse-item__content {
          color: #3c4242;
        }
      }
    }
  }

  .header-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    .text-wrapper {
      display: flex;
      align-items: center;

      .header-icon {
        width: 20px !important;
        height: 20px !important;
        color: var(--van-primary-color);
      }

      .header-title {
        font-weight: 600;
        font-size: 16px;
        margin-left: 8px;
        color: #3c4242;
        line-height: 22px;
      }
    }
    .right-header {
      .click_icon {
        height: 100%;
        width: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        .mark-title-info {
          margin-left: 3px;
          width: 12px !important;
          height: 12px !important;
        }
      }
    }
  }
}
</style>
