<template>
  <HcpCollapseContainer
    header-icon="hcp-h5-friend-circle"
    header-title="学术合作"
    tabName="学术合作"
    v-model="activeNames"
  >
    <template #content>
      <relation-circle :init="useRelationShip"></relation-circle>
    </template>
  </HcpCollapseContainer>
</template>

<script setup lang="ts" name="AcademicCollaboration">
import { ref } from "vue";
import HcpCollapseContainer from "@/components/base/HcpCollapseContainer.vue";
import RelationCircle from "@/components/business/RelationCircle.vue";
import { useRelationShip } from "@/views/hcp360/hook/academic-collaboration-hook";
const activeNames = ref(["学术合作"]);
</script>

<style scoped lang="less"></style>
