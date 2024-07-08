<template>
  <div class="content_tag">
    <div class="content_tag_item" v-for="(item, index) in tags" :key="index">
      {{ item }}
    </div>
  </div>
</template>

<script setup lang="ts" name="ContentDetailTag">
defineProps({
  tags: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped lang="less">
.content_tag {
  display: flex;
  align-items: center;
  margin: 8px 0 16px 0;
  .content_tag_item {
    padding: 4px 6px;
    margin-right: 8px;
    display: inline-block;
    font-weight: 400;
    font-size: 10px;
    color: #cc99b9;
    line-height: 10px;
    background: #ffffff;
    border-radius: 2px;
    border: 1px solid #cc99b9;
  }
}
</style>
