<template>
  <HcpCollapseContainer
    header-icon="hcp-h5-cst-concept"
    header-title="KEE观念"
    tabName="KEE观念"
    v-model="activeName"
  >
    <template #content>
      <KeeCustomerConceptDetail />
    </template>
  </HcpCollapseContainer>
</template>

<script setup lang="ts" name="KeeCustomerConcept">
import { ref } from "vue";
import HcpCollapseContainer from "@/components/base/HcpCollapseContainer.vue";
import KeeCustomerConceptDetail from "./components/KeeConceptDetail.vue";

const activeName = ref(["KEE观念"]);
</script>

<style scoped lang="less"></style>
