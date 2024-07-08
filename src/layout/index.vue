<script setup lang="ts">
import { useCachedViewStoreHook } from '@/store/modules/cachedView'
import { computed } from 'vue'
import type { ConfigProviderThemeVars } from 'vant'
const cachedViews = computed(() => {
  return useCachedViewStoreHook().cachedViewList
})

const themeVars: ConfigProviderThemeVars = {
  primaryColor: '#ab0165'
}
</script>

<template>
  <div class="app-wrapper">
    <van-config-provider :theme-vars="themeVars" theme-vars-scope="global">
      <router-view v-slot="{ Component }">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </van-config-provider>
  </div>
</template>

<style lang="less" scoped>
@import '@/styles/mixin.less';

.app-wrapper {
  .clearfix();
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
