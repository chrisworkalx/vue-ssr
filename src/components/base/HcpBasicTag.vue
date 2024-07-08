<template>
  <span class="market-tag">
    {{ tag }}
  </span>
</template>

<script setup lang="ts" name="HcpBasicTag">
defineProps({
  tag: {
    type: String
  }
});
</script>

<style scoped lang="less">
.market-tag {
  background: #f2e5ed;
  display: inline-block;
  margin-right: 8px;
  margin-bottom: 4px;
  border-radius: 2px;
  padding: 2px 8px;
  font-weight: 400;
  font-size: 12px;
  color: var(--van-primary-color);
}
</style>
