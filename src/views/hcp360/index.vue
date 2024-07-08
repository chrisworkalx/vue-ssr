<template>
  <div class="wrapper">
    <customer-profile></customer-profile>
    <customer-hobby></customer-hobby>
    <customer-concept></customer-concept>
    <academic-collaboration></academic-collaboration>
  </div>
</template>

<script lang="ts" setup name="HCP360">
import { defineAsyncComponent } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useCacheTokenHook } from '@/store/modules/cacheToken'

const CustomerProfile = defineAsyncComponent(
  () => import('./customer-profile.vue')
)
const CustomerHobby = defineAsyncComponent(() => import('./customer-hobby.vue'))
const CustomerConcept = defineAsyncComponent(
  () => import('./customer-concept.vue')
)
const AcademicCollaboration = defineAsyncComponent(
  () => import('./academic-collaboration.vue')
)
const cacheTokenStore = useCacheTokenHook()
onBeforeRouteLeave(() => {
  cacheTokenStore.resetToken()
})
</script>

<style lang="less">
.wrapper {
  padding-top: 10px;
  width: 100vw;
  background: #fafafa;
  height: 100%;
}
</style>
