<template>
  <div class="flex-1">
    <HcpBasicTab
      :active-key="activeTab"
      :tab-data="tabData"
      @updateTabActive="handleUpdateTabKey"
    ></HcpBasicTab>
  </div>
</template>

<script setup lang="ts" name="KeeConceptDetail">
import { defineAsyncComponent, ref } from "vue";
import HcpBasicTab from "@/components/base/HcpBasicTab.vue";
import { useWatchLogPoint } from "../hook/kee-log-point";

const MedicalUnderstandingLadder = defineAsyncComponent(
  () => import("./MedicalUnderstandingLadder.vue")
);
const MarketBrandRecognition = defineAsyncComponent(
  () => import("./MarketBrandRecognition.vue")
);

const activeTab = ref("KEE医学理解度阶梯");

const handleUpdateTabKey = key => {
  activeTab.value = key;
};

const tabData = [
  {
    tabTitle: "医学理解度阶梯",
    tabKey: "KEE医学理解度阶梯",
    tabComponent: MedicalUnderstandingLadder
  },
  {
    tabTitle: "市场品牌认可度",
    tabKey: "KEE市场品牌认可度",
    tabComponent: MarketBrandRecognition
  }
];

useWatchLogPoint(() => activeTab.value);
</script>

<style scoped lang="less">
.no-data {
  margin-top: 16px;
  font-size: 12px;
  color: #8a8e8e;
  text-align: center;
}
</style>
