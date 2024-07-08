<template>
  <label class="hcp-radio">
    <input
      type="radio"
      :name="groupName"
      :value="value"
      :checked="isChecked"
      @change="handleChange"
      hidden
    />
    <i :class="['radio-circle', { 'is-active': isChecked }]"></i>
    <span class="radio_label">{{ label }}</span>
  </label>
</template>

<script lang="ts" setup name="HcpRadio">
import { computed, inject, unref } from "vue";
import { createUniqName } from "@/utils/util";

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number, Boolean],
    required: true
  },
  groupName: {
    type: String,
    default: createUniqName()
  }
});

const parentProps = inject("radioGroup") as any;

const isChecked = computed(() => unref(parentProps.value) === props.value);

const handleChange = () => {
  parentProps.updateValue(props.value);
};
</script>

<style scoped lang="less">
.hcp-radio {
  display: flex;
  align-items: center;
  cursor: pointer;
  .radio-circle {
    width: 18px;
    height: 18px;
    border: 1px solid #ccc;
    border-radius: 50%;
    margin-right: 8px;
    position: relative;
    display: inline-block;

    &.is-active {
      border-color: var(--van-primary-color);
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 13px;
        height: 13px;
        background-color: var(--van-primary-color);
        border-radius: 50%;
      }
    }
  }
  .radio_label {
    font-size: 12px;
    color: #3c4242;
  }
}
</style>
