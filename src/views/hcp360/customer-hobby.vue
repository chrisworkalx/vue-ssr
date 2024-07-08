<template>
  <HcpCollapseContainer
    header-icon="hcp-h5-cst-hobby"
    header-title="客户偏好"
    tabName="客户偏好"
    v-model="activeName"
  >
    <template #content>
      <HcpBasicTab
        space
        :active-key="active"
        :tab-data="tabData"
        @updateTabActive="handleUpdateTabKey"
      ></HcpBasicTab>
    </template>
  </HcpCollapseContainer>
</template>

<script setup lang="ts" name="CustomerHobby">
import { ref, watch, defineAsyncComponent } from "vue";
import HcpCollapseContainer from "@/components/base/HcpCollapseContainer.vue";
import HcpBasicTab from "@/components/base/HcpBasicTab.vue";

const AttendingPreference = defineAsyncComponent(
  () => import("./components/business/AttendingPreference.vue")
);

const ContentPreference = defineAsyncComponent(
  () => import("./components/business/ContentPreference.vue")
);

const active = ref("content");
const activeName = ref(["客户偏好"]);

const tabData = [
  {
    tabTitle: "内容偏好",
    tabKey: "content",
    tabComponent: ContentPreference
  },
  {
    tabTitle: "参会偏好",
    tabKey: "meeting",
    tabComponent: AttendingPreference
  }
];

const handleUpdateTabKey = key => {
  active.value = key;
};
</script>

<style scoped lang="less"></style>
