<template>
  <div class="hcp-h5-tab">
    <van-tabs :active="props.activeKey" @update:active="onClickTab" type="card">
      <van-tab
        v-for="(item, index) in props.tabData"
        :key="item.tabKey"
        :title="item.tabTitle"
        :name="item.tabKey"
      >
        <template #title v-if="item.slot">
          <div class="hcp-slot-title-box">
            <slot name="title" :item="item">{{ item.tabTitle }}</slot>
          </div>
        </template>
        <div :class="[{ 'hcp-mt-12': space }]">
          <component
            :tabIndex="index"
            :query="item.query"
            :is="item.tabComponent"
            :ref="el => setTabsRef(el, item.tabKey)"
          ></component>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts" name="HcpBasicTab">
const emits = defineEmits(["updateTabActive"]);
const props = withDefaults(
  defineProps<{
    activeKey?: string;
    tabData?: Array<any>;
    space?: boolean;
  }>(),
  {
    tableData: () => [],
    space: false
  }
);
let tabRefs: { [key: string]: any } = {};
const setTabsRef = (el: any, type: string) => {
  if (el) {
    tabRefs[type] = el;
  }
};

defineExpose({
  tabRefs
});

const onClickTab = tabKey => {
  emits("updateTabActive", tabKey);
};
</script>

<style scoped lang="less">
.hcp-h5-tab {
  width: 100%;
  .hcp-mt-12 {
    margin-top: 12px;
  }
  ::v-deep(.van-tabs__wrap) {
    height: 38px;
    line-height: 38px;
    .van-tabs__nav--card {
      margin: 0;
      background: #ffffff;
      border-radius: 2px;
      border: 1px solid #b2b4b4;
      font-size: 14px;
      height: 100%;
      .van-tab--card {
        color: #8a8e8e;
        border-color: #b2b4b4;
        &.van-tab--active {
          background-color: #f2e5ed;
          color: var(--van-primary-color);
          border-color: #b2b4b4;
          font-weight: 400;
        }
      }
    }
  }
  .hcp-slot-title-box {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }
}
</style>
