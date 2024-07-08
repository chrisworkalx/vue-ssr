<template>
  <div class="search-wrapper">
    <div class="brand">
      <BasicSearch
        :field-value="fieldsText.brand"
        padding="12px 12px"
        fontSize="14px"
        :is-listen="false"
      >
        <template #default="{ hide }">
          <van-picker
            :columns="options.brand"
            :columns-field-names="customFieldName"
            v-model="pickModelValue.brand"
            @confirm="
              ({ selectedOptions }) =>
                onConfirm({ selectedOptions }, hide, 'brand')
            "
            @cancel="handleCancel(hide)"
          />
        </template>
      </BasicSearch>
    </div>
    <div class="meeting">
      <BasicSearch
        :field-value="fieldsText.article"
        padding="12px 12px"
        fontSize="14px"
        :is-listen="false"
      >
        <template #default="{ hide }">
          <van-picker
            :columns="options.article"
            v-model="pickModelValue.article"
            :columns-field-names="customFieldName"
            @confirm="
              ({ selectedOptions }) =>
                onConfirm({ selectedOptions }, hide, 'article')
            "
            @cancel="handleCancel(hide)"
          />
        </template>
      </BasicSearch>
    </div>
    <div class="status">
      <BasicSearch
        :field-value="fieldsText.status"
        padding="12px 12px"
        fontSize="14px"
        :is-listen="false"
      >
        <template #default="{ hide }">
          <van-picker
            :columns="options.status"
            :columns-field-names="customFieldName"
            v-model="pickModelValue.status"
            @confirm="
              ({ selectedOptions }) =>
                onConfirm({ selectedOptions }, hide, 'status')
            "
            @cancel="handleCancel(hide)"
          />
        </template>
      </BasicSearch>
    </div>
  </div>

  <div v-if="isShow">
    <div class="content_wrapper">
      <div class="content" v-for="item in articleList" :key="item.id">
        <div class="content_title">
          {{ item.articleName }}
        </div>
        <ContentDetailTag :tags="item.publicationType" />
        <div class="content_detail">
          <Row>
            <ContentDetailItem
              title="会议"
              :content="item.conference"
              is-high-light
              :col-span="24"
              v-if="item.articleType === '会议'"
            />
            <ContentDetailItem
              title="期刊"
              :content="item.journal"
              is-high-light
              :col-span="24"
              v-if="item.articleType === '期刊'"
            />
            <ContentDetailItem
              title="研究相关"
              :content="item.studyRelated"
              :col-span="11"
            />
            <ContentDetailItem
              title="研究简称"
              :content="item.studyBriefName"
              :col-span="13"
            />
            <ContentDetailItem
              title="会议级别"
              :content="item.conferenceLevel"
              :col-span="11"
              v-if="item.articleType === '会议'"
            />
            <ContentDetailItem
              title="影响因子"
              :content="item.ifi"
              :col-span="11"
              v-if="item.articleType === '期刊'"
            />
            <ContentDetailItem
              title="日期"
              :content="item.publishedActualDate"
              :col-span="13"
            />
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

<script setup lang="tsx" name="KeeScienceArticle">
import BasicSearch from "@/components/base/HcpBasicSearch.vue";
import ContentDetailItem from "./base/content-detail-item.vue";
import ContentDetailTag from "./base/content-detail-tag.vue";
import HcpPagination from "@/components/base/HcpPagination/index.vue";
import BasicNoData from "@/components/base/HcpNoData.vue";
import { useScienceArticle } from "../hook/kee-science-hook";
import { Row } from "vant";

const {
  options,
  fieldsText,
  articleList,
  pickModelValue,
  onConfirm,
  handleCancel,
  customFieldName,
  isShow,
  current,
  pages,
  handleRefecth
} = useScienceArticle();
</script>

<style scoped lang="less">
.search-wrapper {
  display: flex;
  width: 100%;
  margin-top: 12px;
  border-bottom: solid 1px #e7e7e8;
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

.content_wrapper {
  margin-bottom: 10px;
  .content {
    padding: 16px 0 0 0;
    border-bottom: solid 1px #e7e7e8;

    .content_title {
      font-weight: 600;
      font-size: 12px;
      color: var(--van-primary-color);
      line-height: 18px;
    }
  }
}
</style>
