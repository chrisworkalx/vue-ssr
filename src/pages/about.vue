<script lang="ts" setup>
import { useCounterStore } from '@/store/modules/count'
import { useServerData } from '@/hooks'

import { onMounted } from 'vue'
const counterStore = useCounterStore()
useServerData(() => {
  console.log('恭喜中奖')
  counterStore.increment()
})

onMounted(() => {
  console.log('onMounted')
  console.log('window-----------------', window)
})
</script>

<template>
  <div class="about">ABOUT</div>
  <div id="count" @click="counterStore.increment()">
    {{ counterStore.count }}
  </div>

  <van-button type="primary">base</van-button>
</template>

<style scoped lang="less">
.about {
  color: orange;
  font-size: 20px;
}
</style>
