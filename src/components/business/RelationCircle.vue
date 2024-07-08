<template>
  <div class="relation-circle-wrapper">
    <BasicSearch
      :field-value="fieldValue"
      :is-listen="false"
      :fontSize="fontSize"
      :padding="padding"
    >
      <template #default="{ hide }">
        <van-picker
          v-model="pickModelValue"
          :columns="columns"
          @confirm="
            ({ selectedOptions }) => onConfirm({ selectedOptions }, hide)
          "
          @cancel="handleCancel(hide)"
        />
      </template>
    </BasicSearch>
    <!-- <div class="tip"><slot name="right-header">信息仅供参考</slot></div> -->
  </div>
  <div v-if="hasData" style="margin-top: 16px; width: 100%">
    <RelationChart :chart-data="chartData" @change-card="handleChangeCard" />
    <RelationShipCard :card-data="cardData" v-if="cardData" />
  </div>
  <div class="no-data" v-else>该模块数据将陆续更新</div>
</template>

<script setup lang="ts" name="Relation-circle">
import RelationChart from "./RelationChart.vue";
import RelationShipCard from "./RelationShipCard.vue";
import BasicSearch from "../base/HcpBasicSearch.vue";

const props = withDefaults(
  defineProps<{
    init: Function;
    padding?: string;
    fontSize?: string;
  }>(),
  {
    init: () => {}
  }
);

const {
  columns,
  fieldValue,
  chartData,
  cardData,
  onConfirm,
  handleCancel,
  handleChangeCard,
  hasData,
  pickModelValue
}: {
  cardData: any;
  [p: string]: any;
} = props.init();
</script>

<style scoped lang="less">
.relation-circle-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  .tip {
    font-weight: 400;
    font-size: 10px;
    color: #ccc;
    line-height: 10px;
    text-align: center;
    margin-left: 14px;
  }
  ::v-deep(.custom-cell-box) {
    width: auto;
    flex: 1;
    margin-bottom: 0;
  }
}
.no-data {
  width: 100%;
  margin-top: 16px;
  font-size: 12px;
  color: #8a8e8e;
  text-align: center;
}
</style>
