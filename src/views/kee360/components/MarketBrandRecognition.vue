<!-- 市场品牌认可度 -->
<template>
  <div class="basic-wrapper">
    <BasicSearch
      v-model="cascaderValue"
      :field-value="fieldValue"
      :options="options"
      placeholder="请选择"
      padding="12px 12px"
      fontSize="14px"
      :field-names="fieldNames"
      :default-option="defaultOption"
      @finish="handleFinish"
      @change="handleChange"
      @search="handleSearch"
    />
  </div>

  <div class="basic-radio-wrapper">
    <HcpBasicTitle title="观念结果统计" />
    <hcp-basic-radio-group v-model="selectedValue">
      <hcp-basic-radio
        label="月观念"
        value="月观念"
        group-name="类型"
      ></hcp-basic-radio>
      <hcp-basic-radio
        label="周观念"
        value="周观念"
        group-name="类型"
      ></hcp-basic-radio>
      <hcp-basic-radio
        label="日观念"
        value="日观念"
        group-name="类型"
      ></hcp-basic-radio>
    </hcp-basic-radio-group>
  </div>
  <CommonLineChart
    :chart-data="chartData"
    chart-height="232px"
    is-show-footer
    v-if="isShow"
  >
  </CommonLineChart>
  <HcpNoData v-else></HcpNoData>
</template>

<script setup lang="ts" name="MarketBrandRecognition">
import BasicSearch from "@/components/base/HcpBasicSearch.vue";
import CommonLineChart from "@/components/business/CommonLineChart.vue";
import HcpNoData from "@/components/base/HcpNoData.vue";

import { useMarketConcept } from "../hook/kee-customer-concept-hook";

import HcpBasicRadio from "@/components/base/HcpBasicRadio.vue";
import HcpBasicRadioGroup from "@/components/base/HcpBasicRadioGroup.vue";

const {
  fieldValue,
  cascaderValue,
  options,
  fieldNames,
  handleFinish,
  defaultOption,
  selectedValue,
  chartData,
  isShow,
  handleChange,
  handleSearch
} = useMarketConcept();
</script>

<style scoped lang="less">
.basic-wrapper {
  margin: 12px 0;
}

.basic-radio-wrapper {
  margin-bottom: 12px;
}
</style>
