<template>
  <div class="echart-container" ref="MyChart"></div>
  <slot name="footer">
    <div class="echart-bottom-icon" v-if="isShowFooter">
      <slot name="footer">
        <span>三角标识为客户填写</span>
      </slot>
    </div>
  </slot>
</template>

<script setup lang="ts" name="CommonLineChart">
import { watch } from "vue";
import { useCommonLineChart } from "@/hooks/common-chart-hook";

const props = defineProps({
  chartData: {
    type: Object,
    default: () => ({})
  },
  echartsConfig: {
    type: Object,
    default: () => ({})
  },
  extraConfig: {
    type: Object,
    default: () => null
  },
  isShowFooter: {
    type: Boolean,
    default: false
  },
  chartHeight: {
    type: String,
    default: "180px"
  }
});
const { MyChart, isMounted, fillChartData } = useCommonLineChart(
  props.echartsConfig,
  props.extraConfig
);

watch(
  () => props.chartData,
  v => {
    if (isMounted.value) {
      fillChartData(v);
    }
  },
  { deep: true, flush: "post" }
);
</script>

<style scoped lang="less">
.echart-container {
  width: 100%;
  height: v-bind(chartHeight);
}
.echart-bottom-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #8a8e8e;
  .icon-box {
    display: flex;
    align-items: center;
    margin: 0 13px;
    .sub-icon {
      color: #ab0165;
      width: 10px;
      height: 10px;
      margin-right: 4px;
      &.circle {
        width: 8px;
        height: 8px;
      }
    }
  }
}
</style>
