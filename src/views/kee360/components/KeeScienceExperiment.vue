<template>
  <div class="search-wrapper">
    <BasicSearch
      :field-value="fieldValue"
      padding="12px 12px"
      fontSize="14px"
      :is-listen="false"
    >
      <template #default="{ hide }">
        <van-picker
          :columns="brandOptions"
          :columns-field-names="fieldNames"
          @confirm="
            ({ selectedOptions }) => onConfirm({ selectedOptions }, hide)
          "
          @cancel="handleCancel(hide)"
        />
      </template>
    </BasicSearch>
  </div>

  <div v-if="isShow">
    <div class="content_wrapper">
      <div class="content" v-for="(item, i) in experimentList" :key="i">
        <div class="content_title">
          <span class="category_word">{{ item.studyType }}</span>
          {{ item.studyTitleCn }}
        </div>
        <ContentDetailTag :tags="item.status" />
        <div class="content_detail">
          <Row>
            <ContentDetailItem
              title="Leading PI"
              :content="item.piName"
              is-high-light
            />
          </Row>
          <Row>
            <ContentDetailItem title="医院" :content="item.piInstitution" />
          </Row>
        </div>
      </div>
    </div>
    <hcp-pagination
      v-model="current"
      :range-size="1"
      :pages="pages"
      @update:pages="handleRefecth"
    />
  </div>
  <BasicNoData v-else />
</template>

<script setup lang="ts" name="KeeScienceExperiment">
import BasicSearch from "@/components/base/HcpBasicSearch.vue";
import ContentDetailItem from "./base/content-detail-item.vue";
import ContentDetailTag from "./base/content-detail-tag.vue";
import BasicNoData from "@/components/base/HcpNoData.vue";
import HcpPagination from "@/components/base/HcpPagination/index.vue";

import { useScienceExperiment } from "../hook/kee-science-hook";
import { Row } from "vant";

const {
  fieldValue,
  fieldNames,
  experimentList,
  brandOptions,
  onConfirm,
  handleCancel,
  isShow,
  current,
  pages,
  handleRefecth
} = useScienceExperiment();
</script>

<style scoped lang="less">
.search-wrapper {
  display: flex;
  width: 100%;
  margin-top: 12px;
  border-bottom: solid 1px #e7e7e8;
}

.content_wrapper {
  margin-bottom: 10px;
  .content {
    padding: 16px 0 0 0;
    border-bottom: solid 1px #e7e7e8;
    &:last-child {
      border-bottom: none;
      .content_detail {
        ::v-deep(.van-row) {
          &:last-child {
            .van-col:nth-last-child(1),
            .van-col:nth-last-child(2) {
              .content_detail_wrapper {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
    .content_title {
      font-weight: 600;
      font-size: 12px;
      color: var(--van-primary-color);
      line-height: 18px;
      .category_word {
        font-size: 10px;
        color: #8a8e8e;
        font-weight: 400;
      }
    }
  }
}
</style>
