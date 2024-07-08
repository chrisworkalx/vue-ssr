<template>
  <HcpCollapseContainer
    header-icon="hcp-h5-friend-circle"
    header-title="学术合作"
    tabName="KEE学术合作"
    v-model="activeNames"
  >
    <template #content>
      <relation-circle
        :init="useRelationShip"
        padding="12px 12px"
        fontSize="14px"
      ></relation-circle>
    </template>
  </HcpCollapseContainer>
</template>

<script setup lang="ts" name="KeeAcademicCollaboration">
import { ref } from "vue";
import HcpCollapseContainer from "@/components/base/HcpCollapseContainer.vue";
import RelationCircle from "@/components/business/RelationCircle.vue";
import { useRelationShip } from "./hook/kee-academic-collaboration-hook";
const activeNames = ref(["KEE学术合作"]);
</script>

<style scoped lang="less"></style>
