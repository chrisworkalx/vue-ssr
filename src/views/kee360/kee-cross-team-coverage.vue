<template>
  <HcpCollapseContainer
    header-icon="teamCoverage"
    header-title="跨团队覆盖"
    tabName="KEE跨团队覆盖"
    v-model="activeName"
  >
    <template #content>
      <KeeCrossTeamCoverageDetail />
    </template>
  </HcpCollapseContainer>
</template>

<script setup lang="ts" name="KeeCustomerConcept">
import { ref } from "vue";
import HcpCollapseContainer from "@/components/base/HcpCollapseContainer.vue";
import KeeCrossTeamCoverageDetail from "./components/KeeCrossTeamCoverageDetail.vue";

const activeName = ref(["KEE跨团队覆盖"]);
</script>

<style scoped lang="less"></style>
