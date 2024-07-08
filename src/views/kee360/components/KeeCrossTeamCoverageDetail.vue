<template>
  <div class="search-wrapper">
    <div class="brand">
      <BasicSearch
        :field-value="fields.team"
        padding="12px 12px"
        fontSize="14px"
        :is-listen="false"
        @open="handleTeamOpen"
      >
        <template #default="{ hide }">
          <van-picker
            v-model="pickModelValue.team"
            :columns-field-names="customFieldName"
            :columns="options.team"
            @confirm="
              ({ selectedOptions }) =>
                onConfirm({ selectedOptions }, hide, 'team')
            "
            @cancel="handleCancel(hide)"
          />
        </template>
      </BasicSearch>
    </div>
    <div class="meeting">
      <BasicSearch
        :field-value="fields.brand"
        padding="12px 12px"
        fontSize="14px"
        :is-listen="false"
        @open="handleBrandOpen"
      >
        <template #default="{ hide }">
          <van-picker
            v-model="pickModelValue.brand"
            :columns-field-names="customFieldName"
            :columns="options.brand"
            @confirm="
              ({ selectedOptions }) =>
                onConfirm({ selectedOptions }, hide, 'brand')
            "
            @cancel="handleCancel(hide)"
          />
        </template>
      </BasicSearch>
    </div>
    <div class="status">
      <BasicSearch
        :field-value="fields.mtd"
        padding="12px 12px"
        fontSize="14px"
        :is-listen="false"
        @open="handleMTDOpen"
      >
        <template #default="{ hide }">
          <van-picker
            v-model="pickModelValue.mtd"
            :columns-field-names="customFieldName"
            :columns="options.mtd"
            @confirm="
              ({ selectedOptions }) =>
                onConfirm({ selectedOptions }, hide, 'mtd')
            "
            @cancel="handleCancel(hide)"
          />
        </template>
      </BasicSearch>
    </div>
  </div>

  <div class="card_list">
    <div class="card_item" v-for="(item, index) in coverageCards" :key="index">
      <BasicProfileCard
        :image-name="item.imageName"
        :title="item.title"
        :value="item.value"
      />
    </div>
  </div>
</template>

<script setup lang="tsx" name="KeeCrossTeamCoverageDetail">
import BasicSearch from "@/components/base/HcpBasicSearch.vue";
import BasicProfileCard from "@/components/business/BasicProfileCard.vue";
import { useKeeCrossTeamCoverage } from "../hook/kee-cross-team-coverage-hook";

const {
  coverageCards,
  options,
  fields,
  customFieldName,
  onConfirm,
  handleCancel,
  pickModelValue,
  handleTeamOpen,
  handleBrandOpen,
  handleMTDOpen
} = useKeeCrossTeamCoverage();
</script>

<style scoped lang="less">
.search-wrapper {
  display: flex;
  width: 100%;
  margin-top: 12px;
  gap: 14px;
  .brand {
    flex: 3;
  }
  .meeting {
    flex: 3;
  }
  .status {
    flex: 2;
  }
}

.card_list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .card_item {
    width: 152px;
  }
}
</style>
