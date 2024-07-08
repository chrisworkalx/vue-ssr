<template>
  <div class="tab-two-wrapper">
    <div class="checkbox-container">
      <div class="flex-3">
        <van-field name="checkboxGroup" label="">
          <template #input>
            <van-checkbox-group v-model="groupChecked" direction="horizontal">
              <van-checkbox
                name="自主阅读"
                shape="square"
                :disabled="checkDisabled('自主阅读', '代表转发')"
                >医学天地</van-checkbox
              >
              <van-checkbox
                name="代表转发"
                shape="square"
                :disabled="checkDisabled('代表转发', '自主阅读')"
                >代表转发</van-checkbox
              >
            </van-checkbox-group>
          </template>
        </van-field>
      </div>
      <!-- <div class="tip flex-2">仅分析近半年e学荟阅读数据</div> -->
    </div>
    <div v-if="isHasData">
      <HcpBasicTitle class="out-side-class">
        <template #mainTitle>
          <div class="extra-title">
            <span
              >该客户近半年，最喜欢在{{
                favoriteReadLineData?.[0]?.day
              }}&nbsp;</span
            >
            <span class="highlight">{{ favoriteReadLineData?.[0]?.time }}</span>
            <span>&nbsp;,&nbsp;</span>
            <span>{{ favoriteReadLineData?.[1]?.day }}&nbsp;</span>
            <span class="highlight"
              >{{ favoriteReadLineData?.[1]?.time }}&nbsp;</span
            >
            <span>阅读文章内容</span>
          </div>
        </template>
      </HcpBasicTitle>

      <!-- 热力图组件 -->
      <HcpHotArea :hot-data="hotData" />

      <div v-for="(item, index) in allFocusBlocks" :key="index">
        <HcpBasicTitle :title="`最常阅读的Top3${item.title}：`" />
        <HcpBasicTag
          v-for="$item in item.tags"
          :key="$item.id"
          :tag="$item.contentTagDesc"
        />
      </div>
    </div>
    <BasicNoData v-else />
  </div>
</template>

<script setup lang="ts" name="ContentPreference">
import { ref, watch, computed, nextTick } from "vue";
import HcpBasicTitle from "@/components/base/HcpBasicTitle.vue";
import HcpBasicTag from "@/components/base/HcpBasicTag.vue";
import HcpHotArea from "@/components/base/HcpHotArea.vue";
import BasicNoData from "@/components/base/HcpNoData.vue";

import {
  getCustomerPreferencesFocusTop,
  getCustomerPreferencesTimelineList,
  getCustomerPreferencesTimeline
} from "@/api";

import { serializeData } from "../../utils/index";

const groupChecked = ref(["自主阅读", "代表转发"]);

type ReadDay = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

const MapDay = {
  Mon: "周一",
  Tue: "周二",
  Wed: "周三",
  Thr: "周四",
  Fri: "周五",
  Sat: "周六",
  Sun: "周日"
};
const MapDayOrder = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thr: 4,
  Fri: 5,
  Sat: 6,
  Sun: 7
};

function formatDay(day: ReadDay) {
  return MapDay[day];
}

const favoriteReadLineData = ref<
  Array<{
    day: "";
    time: "";
  }>
>([]);

const readType = computed(() => {
  return groupChecked.value.length > 1 ? "全部" : groupChecked.value[0];
});

const isHasData = ref(true);

const hotData = ref<Array<any>>([]);

const allFocusBlocks = ref<Array<any>>([]);

async function init() {
  const [focusTopRes, hotAreaRes, timeLineRes] = await Promise.all([
    getCustomerPreferencesFocusTop({ readType: readType.value }),
    getCustomerPreferencesTimelineList({ readType: readType.value }),
    getCustomerPreferencesTimeline({ readType: readType.value })
  ]);

  favoriteReadLineData.value = timeLineRes?.map(i => ({
    day: formatDay(i?.contentPeriodDesc?.split(" ")?.[0]),
    time: i?.contentPeriodDesc?.split(" ")?.[1]
  }));

  if (Array.isArray(focusTopRes)) {
    const serializeFocusData = serializeData(focusTopRes);
    const result = [];
    for (const item of serializeFocusData) {
      const [key, value] = item;
      result.push({
        title: key,
        tags: value
      });
    }
    allFocusBlocks.value = result;
  }

  const originHotData =
    (hotAreaRes?.map(i => ({
      ...i,
      weekType: i?.contentPeriodDesc?.split(" ")[0],
      timeKey: i?.contentPeriodDesc?.split(" ")[1]
    })) as any) || [];

  const result = {};

  for (let i = 0; i < originHotData.length; i++) {
    const item = originHotData[i];
    item.orderIndex = MapDayOrder[item.weekType];
    if (result[item.timeKey]) {
      result[item.timeKey].push(item);
    } else {
      result[item.timeKey] = [item];
    }
  }

  const filterHotData = Object.keys(result).reduce((target, nextKey) => {
    const nextItem = result[nextKey];
    nextItem.sort((a, b) => a.orderIndex - b.orderIndex);
    target.push(...nextItem);
    return target;
  }, []);
  hotData.value = filterHotData;
  nextTick(() => {
    isHasData.value =
      hotAreaRes?.length > 0 || allFocusBlocks.value?.length > 0;
  });
}

init();

watch(groupChecked, () => {
  init();
});

const checkDisabled = (a, b) => {
  return groupChecked.value.length &&
    groupChecked.value.includes(a) &&
    !groupChecked.value.includes(b)
    ? true
    : false;
};
</script>

<style scoped lang="less">
.main-content-text {
  font-size: 14px;
  color: #3c4242;
}

.tab-two-wrapper {
  .checkbox-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tip {
      font-weight: 400;
      font-size: 10px;
      color: #ccc;
      line-height: 10px;
      text-align: center;
    }
  }
  .out-side-class {
    .extra-title {
      margin-top: -2px;
      font-weight: 400;
      font-size: 12px;
      color: #3c4242;
      line-height: 20px;
      .highlight {
        color: var(--van-primary-color);
      }
    }
    align-items: flex-start;
    ::v-deep(.basic-title-wrapper) {
      align-items: flex-start;
    }
  }

  ::v-deep(.van-cell) {
    padding: 0;
    .van-checkbox {
      .van-icon {
        font-size: 14px;
        border-radius: 4px;
      }
      .van-checkbox__label {
        font-size: 12px;
      }
      .van-checkbox__icon--checked .van-icon {
        color: var(--van-checkbox-checked-icon-color);
        background-color: #fff;
      }
      .van-checkbox__icon--disabled.van-checkbox__icon--checked .van-icon {
        color: var(--van-checkbox-disabled-icon-color);
      }
      .van-checkbox__icon--disabled .van-icon {
        background-color: rgba(224, 228, 228, 1);
      }
    }
  }
}
</style>
