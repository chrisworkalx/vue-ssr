<!--医学理解阶梯-->
<template>
  <div class="basic-wrapper">
    <BasicSearch
      :field-value="fieldValue"
      padding="12px 12px"
      fontSize="14px"
      :is-listen="false"
      show-search
      @search="handleSearch"
    >
      <template #default="{ hide }">
        <van-picker
          v-model="pickModelValue"
          :columns="brandOptions"
          :columns-field-names="fieldNames"
          @confirm="
            ({ selectedOptions }) => onConfirm({ selectedOptions }, hide)
          "
          @cancel="handleCancel(hide)"
        />
      </template>
    </BasicSearch>
  </div>
  <CommonLineChart
    :extra-config="extraConfig"
    :echarts-config="echartsConfig"
    :chart-data="chartData"
    chart-height="222px"
    v-if="isShow"
  />
  <HcpNoData v-else></HcpNoData>
</template>

<script setup lang="ts" name="MedicalUnderstandingLadder">
import BasicSearch from "@/components/base/HcpBasicSearch.vue";
import CommonLineChart from "@/components/business/CommonLineChart.vue";
import HcpNoData from "@/components/base/HcpNoData.vue";

import { useMedicineConcept } from "../hook/kee-customer-concept-hook";

const {
  pickModelValue,
  onConfirm,
  handleCancel,
  brandOptions,
  fieldValue,
  fieldNames,
  extraConfig,
  echartsConfig,
  chartData,
  isShow,
  handleSearch
} = useMedicineConcept();
</script>

<style scoped lang="less">
.basic-wrapper {
  margin: 12px 0;
}
</style>
