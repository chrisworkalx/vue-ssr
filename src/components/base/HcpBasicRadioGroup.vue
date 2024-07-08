<template>
  <div class="radio_group">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup name="HcpRadioGroup">
import { ref, watch, provide } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ""
  }
});

const emits = defineEmits(["update:modelValue", "updateRadio"]);

const groupValue = ref(props.modelValue);

const updateValue = (val: any) => {
  groupValue.value = val;
  emits("update:modelValue", val);
};

watch(
  () => groupValue.value,
  v => {
    emits("updateRadio", v);
  }
);

provide("radioGroup", {
  value: groupValue,
  updateValue
});
</script>

<style lang="less" scoped>
.radio_group {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
