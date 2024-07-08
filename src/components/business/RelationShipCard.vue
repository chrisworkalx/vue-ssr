<template>
  <div class="relation-card">
    <div class="inner">
      <div class="doctor-name">{{ cardData.rhcpName }}</div>
      <div class="hcp-mt-12 hcp-border-down-1">
        <div class="detail flex">
          <div class="flex align-center">
            <svg-icon name="username" class="user-icon" />
            <span>{{ cardData.rhcpTitle }}</span>
          </div>

          <div class="flex align-center left-border">
            <div>
              <svg-icon name="position" class="user-icon" />
            </div>
            <span>{{ cardData.rhcpSpecialty }}</span>
          </div>
        </div>
        <div class="detail hcp-mt-12 flex align-center">
          <svg-icon name="hosipital" class="user-icon" />
          <span>{{ cardData.rhcpHcoName }}</span>
        </div>
      </div>
      <div class="detail hcp-mt-12 flex align-center">
        <svg-icon name="operate" class="user-icon" />
        <span>最近一次合作</span>
      </div>

      <div class="ticket hcp-mt-12">
        <span class="high-light">{{ cardData.detailedRelationType }}</span>
        <span>{{ cardData.relationDetail }}</span>
      </div>
      <div class="bottom-date">{{ formatTime(cardData.detailedDt) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts" name="RelationShipCard">
import { formatTime } from "@/utils/util";
defineProps<{
  cardData?: {
    rhcpName: string;
    rhcpTitle: string;
    rhcpSpecialty: string;
    rhcpHcoName: string;
    relationType: string;
    relationDetail: string;
    etlInsertDt: string;
    [p: string]: any;
  };
}>();
</script>

<style scoped lang="less">
.relation-card {
  margin-top: 20px;
  background: #ffffff;
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.1);
  width: 100%;
  .detail {
    font-weight: 400;
    font-size: 14px;
    color: #3c4242;
    line-height: 14px;
    span {
      margin-left: 12px;
    }
  }
  .hcp-mt-12 {
    margin-top: 12px;
    &.hcp-border-down-1 {
      border-bottom: 1px solid #eee;
      padding-bottom: 12px;
      .left-border {
        padding-left: 16px;
        border-left: solid 1px #ccc;
        margin-left: 20px;
        max-width: 180px;
      }
    }
  }
  .inner {
    padding: 16px;
    .doctor-name {
      font-weight: 500;
      font-size: 18px;
      color: #3c4242;
      line-height: 18px;
    }
    .ticket {
      font-size: 12px;
      color: #3c4242;
      line-height: 14px;
      .high-light {
        font-weight: 500;
        color: #830051;
        margin-right: 14px;
      }
    }
  }
  .user-icon {
    width: 14px;
    height: 14px;
  }
  .bottom-date {
    font-size: 12px;
    color: #8a8e8e;
    line-height: 12px;
    text-align: right;
    margin-top: 10px;
  }
}
</style>
