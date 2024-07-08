<template>
  <div :class="['profile-card', outClass]">
    <div class="content">
      <div class="info">
        <div class="mark-title">
          <span>{{ title }}</span>
          <van-popover
            v-model:show="showToast"
            :placement="placement"
            v-if="tooltip"
          >
            <div class="popover-text">{{ tooltip }}</div>
            <template #reference>
              <svg-icon
                name="hcp-h5-info"
                class="mark-title-info"
                v-if="tooltip"
              />
            </template>
          </van-popover>
        </div>
      </div>
      <div class="mark-value">{{ value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts" name="BasicProfileCard">
import { ref, computed } from "vue";
import type { PopoverPlacement } from "vant";

const showToast = ref(false);

const props = withDefaults(
  defineProps<{
    imageName: string;
    imageSize?: string;
    imgPosition?: string;
    imageColor?: string;
    title: string;
    value: string | number;
    tooltip?: string;
    placement?: PopoverPlacement;
    outClass?: string;
  }>(),
  {
    imgPosition: "right bottom",
    imageSize: "32px 32px",
    placement: "right",
    imageColor: "#fff4faff",
    tooltip: ""
  }
);

const bgImgUrl = computed(() => {
  return `url(${
    new URL(`../../assets/${props.imageName}.png`, import.meta.url).href
  })`;
});
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
  width: 100%;
  height: 48px;
  padding: 8px 8px 0 8px;
  border-radius: 2px;
  margin-bottom: 8px;
  position: relative;
  overflow: hidden;
  transition: all linear 0.2s;
  background-image: v-bind(bgImgUrl);
  background-color: v-bind(imageColor);
  background-position: v-bind(imgPosition);
  background-repeat: no-repeat;
  background-size: v-bind(imageSize);

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
      margin-bottom: 2px;

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
      position: absolute;
      bottom: 2px;
      right: 18px;
      font-size: 18px;
      color: #830051;
    }
  }
}
</style>
