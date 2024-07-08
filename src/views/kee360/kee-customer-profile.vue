<template>
  <HcpCollapseContainer
    header-icon="hcp-h5-person-draw"
    header-title="KEE画像"
    tabName="KEE画像"
    v-model="activeName"
  >
    <template #content>
      <div class="top-block">
        <div class="search-box">
          <span class="left-title">理解梯度</span>
          <div class="top-search">
            <BasicSearch
              v-model="gradientModel"
              :field-value="gradientFieldValue"
              :options="gradientOptions"
              placeholder="请选择"
              :field-names="fieldNames"
              :default-option="gradientDefaultOption"
              @finish="handleGradientFinish"
              @change="handleGradientChange"
              padding="5px 8px"
              :selectLenth="1"
              @search="handleGradientSearch"
            />
          </div>
        </div>
        <div class="block-value">{{ gradientResult || "-" }}</div>
      </div>

      <div class="middle-block">
        <div class="common kee-level">
          <div class="left-title mb-13">KEE级别</div>
          <div class="block-value">{{ keeLevel || "-" }}</div>
        </div>
        <div class="common report-level">
          <div class="left-title mb-13">讲者级别</div>
          <div class="block-value">{{ speakerLevel || "-" }}</div>
        </div>
      </div>

      <div class="bottom-block">
        <div class="search-box">
          <div class="pop-text">
            <span class="left-title">潜力</span>
            <HcpBasicPopover
              text="显示当前选择的适应症的潜力，默认显示最高潜力适应症对应的潜力"
              v-model="showPopover"
              placement="top"
            />
          </div>
          <div class="top-search">
            <BasicSearch
              v-model="cascaderValue"
              :field-value="fieldValue"
              :options="options"
              placeholder="请选择"
              :field-names="fieldNames"
              @finish="handleFinish"
              :default-option="defaultOption"
              @change="handleChange"
              padding="5px 8px"
              @search="handleSearch"
            />
          </div>
        </div>
        <div class="block-value">{{ potential || "-" }}</div>
      </div>
    </template>
  </HcpCollapseContainer>
</template>

<script setup lang="ts" name="KeeCustomerProfile">
import HcpCollapseContainer from "@/components/base/HcpCollapseContainer.vue";
import BasicSearch from "@/components/base/HcpBasicSearch.vue";
import HcpBasicPopover from "@/components/base/HcpBasicPopover.vue";

import { useKeeCustomerProfile } from "./hook/kee-customer-profile-hook";

const {
  activeName,
  potential,
  showPopover,
  cascaderValue,
  options,
  defaultOption,
  handleChange,
  fieldNames,
  fieldValue,
  handleFinish,
  gradientOptions,
  handleGradientFinish,
  keeLevel,
  speakerLevel,
  gradientResult,
  gradientFieldValue,
  gradientModel,
  gradientDefaultOption,
  handleGradientChange,
  handleSearch,
  handleGradientSearch
} = useKeeCustomerProfile();
</script>

<script lang="ts">
export default {
  name: "KeeCustomerProfile"
};
</script>

<style scoped lang="less">
@img: "../../assets";

.top-search {
  flex: 1;
  ::v-deep(.custom-cell-box) {
    margin-bottom: 0;
  }
}

.block-value {
  font-weight: 500;
  font-size: 20px;
  color: #830051;
  line-height: 24px;
}

.left-title {
  font-weight: 500;
  font-size: 12px;
  color: #8a8e8e;
  line-height: 14px;
  margin-right: 12px;
  &.mb-13 {
    margin-bottom: 13px;
  }
}
.top-block {
  height: 79px;
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
  background-color: #fff4faff;
  background-image: url("@{img}/kee-pic-1.png");
  background-position: right bottom -10px;
  background-repeat: no-repeat;
  background-size: 50px 55px;
  border-radius: 2px;
  .search-box {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 11px 0 8px 0;
  }
}

.middle-block {
  height: 79px;
  width: 100%;
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  .common {
    width: 152px;
    height: 100%;
    background-color: #fff4faff;
    background-position: right bottom;
    background-repeat: no-repeat;
    border-radius: 2px;
    padding: 16px 16px 0 16px;
    box-sizing: border-box;

    &.kee-level {
      background-size: 50px 43px;
      background-image: url("@{img}/kee-pic-2.png");
    }
    &.report-level {
      background-size: 50px 55px;
      background-image: url("@{img}/kee-pic-3.png");
    }
  }
}

.bottom-block {
  height: 79px;
  width: 100%;
  margin-top: 12px;
  padding: 0 16px;
  box-sizing: border-box;
  background-color: #fff4faff;
  background-image: url("@{img}/kee-pic-4.png");
  background-position: right bottom;
  background-repeat: no-repeat;
  background-size: 50px 55px;
  border-radius: 2px;
  .search-box {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 11px 0 8px 0;
    .pop-text {
      display: flex;
      align-items: center;
      margin-right: 12px;
      .left-title {
        margin-right: 0;
      }
    }
  }
}
</style>
