<template>
  <div class="basic-title-wrapper">
    <slot name="icon">
      <div>
        <svg-icon name="hcp-h5-bar" class="bar" />
      </div>
    </slot>
    <slot name="mainTitle">
      <div class="main-title-wrapper">
        <span class="main-title">{{ title }}</span>
        <div class="click_icon">
          <van-popover
            v-model:show="showPopover"
            placement="right"
            :show-arrow="false"
            v-if="tooltip"
          >
            <div class="popover-text">{{ tooltip }}</div>
            <template #reference>
              <svg-icon name="hcp-h5-info" class="mark-title-info" />
            </template>
          </van-popover>
        </div>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts" name="HcpBasicTitle">
import { ref } from "vue";
defineProps({
  title: {
    type: String
  },
  titleClass: {
    type: String,
    default: ""
  },
  outsideClass: {
    type: String,
    default: ""
  },
  tooltip: {
    type: String,
    default: ""
  }
});

const showPopover = ref(false);
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
.basic-title-wrapper {
  margin: 10px 0;
  display: flex;
  // align-items: center;

  .bar {
    width: 2px;
    height: 16px;
    margin-right: 8px;
    margin-top: 2px;
  }
  .main-title-wrapper {
    display: flex;
    align-items: center;
    .main-title {
      font-weight: 600;
      font-size: 14px;
      color: #3c4242;
      flex: 1;
      line-height: 20px;
    }
    .mark-title-info {
      margin-left: 3px;
      width: 12px !important;
      height: 12px !important;
    }
  }
}
</style>
