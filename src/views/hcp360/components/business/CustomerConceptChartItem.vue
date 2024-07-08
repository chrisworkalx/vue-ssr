<template>
  <div class="echart-container" ref="MyEcharts"></div>
  <div class="echart-bottom-icon" v-if="options?.series?.length">
    <span>三角标识为客户填写</span>
  </div>
</template>

<script setup lang="ts" name="CustomerConceptChartItem">
const props = withDefaults(
  defineProps<{
    query: any;
    tabIndex?: number;
  }>(),
  {
    query: () => {}
  }
);
import { useDynamicChart } from "@/views/hcp360/hook/useDynamicChart";

const { MyEcharts, options } = useDynamicChart(
  props.query.title,
  props.tabIndex
);
</script>

<style scoped lang="less">
.echart-container {
  width: 100%;
  height: 180px;
}
.echart-bottom-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #8a8e8e;
}
</style>
