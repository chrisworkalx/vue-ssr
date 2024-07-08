<template>
  <div :class="['profile-card', 'extra', isLargerCard ? 'w152' : '', cardBg]">
    <div class="content">
      <div class="info">
        <div class="mark-title">
          <span>{{ title }}</span>
          <!-- <van-popover v-model:show="showPopover" :placement="placement">
            <div class="popover-text">{{ tooltip }}</div>
            <template #reference>
              <svg-icon
                name="hcp-h5-info"
                class="mark-title-info"
                v-if="tooltip"
              />
            </template>
          </van-popover> -->
        </div>
      </div>
      <div :class="['mark-value', custom ? 'pr-16' : '']">
        <div class="middle-text">{{ value }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="CustomerProfileCard">
import { ref } from 'vue'
import type { PopoverPlacement } from 'vant'
const showPopover = ref(false)

withDefaults(
  defineProps<{
    cardBg: any
    title: string
    value: string | number
    isLargerCard?: boolean
    tooltip: string
    placement?: PopoverPlacement
    custom?: boolean
  }>(),
  {
    isLargerCard: false,
    placement: 'right',
    custom: false
  }
)
</script>

<style scoped lang="less">
::v-deep(.van-popover__content) {
  .popover-text {
    max-width: 144px;
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

::v-deep(.van-popover__arrow) {
  display: none;
}

.profile-card {
  width: 98px;
  height: 100px;
  border-radius: 2px;
  position: relative;
  margin-bottom: 8px;
  position: relative;
  overflow: hidden;
  background-position: center, center;
  background-repeat: no-repeat, no-repeat;
  background-size: 100%, 100%;
  transition: all linear 0.2s;
  &.card1 {
    background-image: url(../../../../assets/card1.png);
  }
  &.card2 {
    background-image: url(../../../../assets/card2.png);
  }
  &.card3 {
    background-image: url(../../../../assets/card3.png);
  }
  &.card4 {
    background-image: url(../../../../assets/card4.png);
  }
  &.card5 {
    background-image: url(../../../../assets/card5.png);
  }
  &.card6 {
    background-image: url(../../../../assets/card6.png);
  }
  &.card7 {
    background-image: url(../../../../assets/card7.png);
  }

  &.w152 {
    width: 152px;
    height: 48px;
    box-shadow: 0px 2px 4px 0px rgba(38, 0, 24, 0.1);
    .content {
      .info {
        margin: 8px 0 0 8px;
      }
      .mark-value {
        margin-top: -10px;
        text-align: right;
        padding-right: 27px;
        display: flex;
        justify-content: flex-end;
        .middle-text {
          width: 30px;
          text-align: center;
        }
        &.pr-16 {
          padding-right: 16px;
        }
      }
    }
  }

  .content {
    ::v-deep(.van-popover__content) {
      .popover-text {
        max-width: 144px;
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

    .info {
      margin: 12px 0 0 12px;

      .mark-title {
        font-size: 10px;
        color: rgba(138, 142, 142, 1);
        display: flex;
        align-items: center;

        &-info {
          margin-left: 3px;
          width: 10px !important;
          height: 10px !important;
        }
      }
    }

    .mark-value {
      width: 100%;
      height: 24px;
      margin-top: 18px;
      text-align: center;
      font-size: 18px;
      color: var(--van-primary-color);
    }
  }
}
</style>
