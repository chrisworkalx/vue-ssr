<template>
  <HcpCollapseContainer
    header-icon="science"
    header-title="科研动态"
    tabName="KEE科研动态"
    v-model="activeName"
  >
    <template #content>
      <KeeScienceDetail />
    </template>
  </HcpCollapseContainer>
</template>

<script setup lang="ts" name="KeeCustomerConcept">
import { ref } from "vue";
import HcpCollapseContainer from "@/components/base/HcpCollapseContainer.vue";
import KeeScienceDetail from "./components/KeeScienceDetail.vue";

const activeName = ref(["KEE科研动态"]);
</script>

<style scoped lang="less"></style>
