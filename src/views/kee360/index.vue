<template>
  <div class="wrapper">
    <KeeCustomerProfile />
    <KeeCustomerConcept />
    <KeeScienceTrend />
    <KeeCrossTeamCoverage />
    <KeeAcadeCollaboration />
  </div>
</template>

<script lang="ts" setup name="HCP360">
import { onBeforeRouteLeave } from "vue-router";
import { useCacheTokenHook } from "@/store/modules/cacheToken";
import KeeCustomerProfile from "./kee-customer-profile.vue";
import KeeCustomerConcept from "./kee-customer-concept.vue";
import KeeScienceTrend from "./kee-science-trend.vue";
import KeeCrossTeamCoverage from "./kee-cross-team-coverage.vue";
import KeeAcadeCollaboration from "./kee-academic-collaboration.vue";
const cacheTokenStore = useCacheTokenHook();
onBeforeRouteLeave(() => {
  cacheTokenStore.resetToken();
});
</script>

<style lang="less">
.wrapper {
  padding-top: 10px;
  width: 100vw;
  background: #fafafa;
  height: 100%;
}
</style>
