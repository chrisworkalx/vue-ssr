<template>
  <van-popover v-model:show="showPopover" :placement="props.placement">
    <div class="popover-text">{{ props.text }}</div>
    <template #reference>
      <svg-icon name="hcp-h5-info" class="mark-title-info" />
    </template>
  </van-popover>
</template>

<script setup lang="ts">
import { useVmodel } from "@/hooks/model-hook";
import type { PopoverPlacement } from "vant";
const props = withDefaults(
  defineProps<{
    placement?: PopoverPlacement;
    text?: string;
    modelValue?: boolean;
  }>(),
  {
    placement: "bottom",
    modelValue: false,
    text: ""
  }
);

const showPopover = useVmodel(props, "modelValue", "");
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
</style>
