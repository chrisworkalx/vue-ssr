<template>
  <HcpCollapseContainer
    header-icon="hcp-h5-person-draw"
    header-title="客户画像"
    tabName="客户画像"
    v-model="activeName"
  >
    <template #content>
      <BasicSearch
        v-model="cascaderValue"
        :field-value="fieldValue"
        :options="options"
        @search="handleSearch"
        placeholder="请选择"
        :field-names="fieldNames"
        :default-option="defaultOption"
        @finish="handleFinish"
        @change="handleChange"
        @click-tab="handleClickTab"
      />

      <CustomerProfileCardVue
        v-for="(item, index) in cardList"
        :key="index"
        :card-bg="item.cardBg"
        :title="item.title"
        :value="item.value"
        :is-larger-card="item.isLargerCard"
        :tooltip="item.tooltip"
        :placement="item.placement"
        :custom="item.custom"
      />
    </template>
  </HcpCollapseContainer>
</template>

<script setup lang="ts" name="CustomerProfile">
//========这一块需要懒加载控制下 组件==============================================/
import HcpCollapseContainer from '@/components/base/HcpCollapseContainer.vue'
import CustomerProfileCardVue from './components/business/CustomerProfileCard.vue'
import BasicSearch from '@/components/base/HcpBasicSearch.vue'

//==========================js=======================================================/
import { useCustomerProfile } from './hook/customer-profile-hook'

const {
  activeName,
  fieldValue,
  cardList,
  cascaderValue,
  options,
  fieldNames,
  handleFinish,
  handleChange,
  handleClickTab,
  defaultOption,
  handleSearch
} = useCustomerProfile()
</script>

<style scoped lang="less"></style>
