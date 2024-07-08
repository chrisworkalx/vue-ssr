<template>
  <div class="flex-1">
    <HcpBasicTab
      :active-key="activeTab"
      :tab-data="tabData"
      @updateTabActive="handleUpdateTabKey"
    >
      <template #title="{ item }">
        <span>{{ item.tabTitle }}</span>
        <HcpBasicPopover
          text="文章发表"
          v-model="showPopover"
          placement="right"
        />
      </template>
    </HcpBasicTab>
  </div>
</template>

<script setup lang="ts" name="KeeScienceDetail">
import { defineAsyncComponent, ref } from "vue";
import HcpBasicTab from "@/components/base/HcpBasicTab.vue";
import HcpBasicPopover from "@/components/base/HcpBasicPopover.vue";
import { useWatchLogPoint } from "../hook/kee-log-point";

const KeeScienceArticle = defineAsyncComponent(
  () => import("./KeeScienceArticle.vue")
);
const KeeScienceExperiment = defineAsyncComponent(
  () => import("./KeeScienceExperiment.vue")
);

const activeTab = ref("KEE文章发表");

const showPopover = ref(false);

const handleUpdateTabKey = key => {
  activeTab.value = key;
};

const tabData = [
  {
    tabTitle: "文章发表",
    tabKey: "KEE文章发表",
    slot: true,
    tabComponent: KeeScienceArticle
  },
  {
    tabTitle: "临床试验",
    tabKey: "KEE临床试验",
    tabComponent: KeeScienceExperiment
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
