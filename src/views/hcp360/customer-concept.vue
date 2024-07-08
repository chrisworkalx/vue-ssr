<template>
  <HcpCollapseContainer
    header-icon="hcp-h5-cst-concept"
    header-title="客户观念"
    tabName="客户观念"
    v-model="activeName"
  >
    <template #content>
      <CustomerConceptDetail />
    </template>
  </HcpCollapseContainer>
</template>

<script setup lang="ts" name="CustomerConcept">
import { ref } from "vue";
import HcpCollapseContainer from "@/components/base/HcpCollapseContainer.vue";
import CustomerConceptDetail from "./components/business/CustomerConceptDetail.vue";

const activeName = ref(["客户观念"]);
</script>

<style scoped lang="less">
::v-deep(.van-popover__content) {
  .popover-text {
    max-width: 144px;
    background: linear-gradient(180deg, #f5f7f6 0%, #ffffff 100%);
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    font-weight: 400;
    font-size: 8px;
    color: #8a8e8e;
    line-height: 12px;
    padding: 12px;
  }
}

::v-deep(.van-popover__arrow) {
  display: none;
}
</style>
