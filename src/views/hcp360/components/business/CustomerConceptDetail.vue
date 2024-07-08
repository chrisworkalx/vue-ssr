<template>
  <div class="flex-1">
    <BasicSearch
      v-model="cascaderValue"
      :field-value="fieldValue"
      :options="options"
      placeholder="请选择"
      :field-names="fieldNames"
      :default-option="defaultOption"
      @finish="handleFinish"
      @change="handleChange"
      @search="handleSearch"
    />

    <div v-if="isShowBlock">
      <HcpBasicTitle title="品牌KM观念趋势" :tooltip="tooltip"> </HcpBasicTitle>

      <div>
        <!-- 图表 -->
        <HcpBasicTab
          :active-key="activeTab"
          :tab-data="tabData"
          @updateTabActive="handleUpdateTabKey"
        ></HcpBasicTab>

        <div class="result-write">
          <HcpBasicTitle title="最近一次观念填写结果" />
          <div class="list" v-if="!!resultList.length">
            <ResultItem
              v-for="(item, index) in resultList"
              :key="index"
              :item-data="item"
            />
          </div>
        </div>
      </div>
    </div>
    <BasicNoData v-else />
  </div>
</template>

<script setup lang="ts" name="CustomerConceptDetail">
import { defineAsyncComponent } from "vue";
import HcpBasicTitle from "@/components/base/HcpBasicTitle.vue";
import HcpBasicTab from "@/components/base/HcpBasicTab.vue";
import ResultItem from "@/components/business/ResultItem.vue";
import BasicSearch from "@/components/base/HcpBasicSearch.vue";
import BasicNoData from "@/components/base/HcpNoData.vue";

//==========================js=======================================================/
import { useCustomerConcept } from "../../hook/customer-concept-hook";

const CustomerConceptChartItem = defineAsyncComponent(
  () => import("./CustomerConceptChartItem.vue")
);

const {
  fieldValue,
  cascaderValue,
  options,
  fieldNames,
  handleFinish,
  resultList,
  activeTab,
  handleUpdateTabKey,
  isShowBlock,
  defaultOption,
  handleChange,
  tooltip,
  handleSearch
} = useCustomerConcept();

const tabData = [
  {
    tabTitle: "月观念",
    tabKey: "month",
    query: {
      title: "月观念"
    },
    tabComponent: CustomerConceptChartItem
  },
  {
    tabTitle: "周观念",
    tabKey: "week",
    query: {
      title: "周观念"
    },
    tabComponent: CustomerConceptChartItem
  },
  {
    tabTitle: "日观念",
    tabKey: "day",
    query: {
      title: "日观念"
    },
    tabComponent: CustomerConceptChartItem
  }
];
</script>

<style scoped lang="less">
.result-write {
  margin-bottom: 6px;
}
</style>
