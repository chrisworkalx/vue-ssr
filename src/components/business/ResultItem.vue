<template>
  <div class="result-item-wrapper">
    <div class="sub-active-text" v-if="props.itemData.writtenFlag === '1'">
      医生填写
    </div>
    <div class="left">
      <div class="content">
        <span class="start-title">关键信息：</span>
        <span class="resource">{{ formatKMData(props.itemData.km) }}</span>
      </div>
      <div class="sub-content">
        <span>{{ props.itemData.kmFillDate }}</span>
        <span>{{ props.itemData.subBu }}</span>
      </div>
    </div>
    <div class="right">{{ props.itemData.kmResult }}</div>
  </div>
</template>

<script setup lang="ts" name="ReseultItem">
const props = defineProps<{
  itemData: {
    km?: string;
    kmFillDate?: string | number;
    kmResult?: string;
    writtenFlag: 0 | 1 | string;
    subBu: string;
  };
}>();

const formatKMData = data => {
  if (data) {
    return data.replace(/\s+/g, "");
  }
  return data;
};
</script>

<style scoped lang="less">
.result-item-wrapper {
  background-color: #fff;
  border-radius: 2px;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  position: relative;
  padding: 10px 0;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  min-height: 74px;

  .sub-active-text {
    padding-top: 5px;
    width: 12px;
    height: 100%;
    font-size: 10px;
    line-height: 12px;
    color: #fff;
    writing-mode: vertical-rl;
    background-color: #830051;
    position: absolute;
    right: 0;
    top: 0;
  }

  &:nth-last-child(1) {
    margin-bottom: 0;
  }

  .left {
    padding-right: 16px;
    margin-left: 19px;
    flex: 1;

    border-right: 1px solid #aaaaaa;

    .content {
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0px;
      line-height: 18px;
      color: rgba(138, 142, 142, 1);
      word-break: break-all;
      // text-align: justify;

      .resource {
        color: rgba(60, 66, 66, 1);
        font-weight: 600;
      }
    }

    .sub-content {
      margin-top: 8px;
      font-weight: 400;
      font-size: 10px;
      color: #8a8e8e;
      line-height: 10px;
      display: flex;
      justify-content: space-between;
    }
  }

  .right {
    width: 60px;
    text-align: center;
    font-weight: bolder;
    font-size: 14px;
    line-height: 42px;
    height: 42px;
    color: #830051;
    box-sizing: border-box;
    margin-right: 10px;
  }
}
</style>
