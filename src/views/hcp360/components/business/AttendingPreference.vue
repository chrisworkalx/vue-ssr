<template>
  <div class="tab-two-wrapper">
    <div v-if="isHasData">
      <!-- <div class="right-info">时间统计范围为YTD</div> -->
      <HcpBasicTitle>
        <template #mainTitle>
          <div class="top-content-abstract main-content-text">
            今年该客户已经参加了<span class="hight-active-color"
              >{{ pageInfo.attendingCount }}次</span
            >AZ内部会议<span v-if="isShowLastParagraph"
              >，同{{ pageInfo.potential }}级医生平均参会次数为<span
                class="hight-active-color"
                >{{ pageInfo.attendingCountAvg }}次</span
              >
            </span>
          </div>
        </template>
      </HcpBasicTitle>

      <HcpBasicTitle>
        <template #mainTitle>
          <div class="top-content-abstract main-content-text">
            <span>近半年该客户最喜欢通过</span
            ><span class="hight-active-color">{{ pageInfo.eventType }}</span
            ><span>的方式参加AZ内部会议</span>
          </div>
        </template>
      </HcpBasicTitle>

      <div
        :class="[
          'first-three-container',
          isLeftTabActive ? 'left-active' : 'right-active'
        ]"
      >
        <div class="flex tabs cursor-pointer">
          <div class="flex flex-1 left-tab" @click="leftTabClick">
            <span>最常听的讲者</span>
          </div>
          <div class="flex-1 right-tab" @click="rightTabClick">
            <span>最常来的听众</span>
          </div>
        </div>
        <div class="member-info">
          <div
            v-for="(item, index) in doctorMembers"
            :key="item.id"
            class="flex hcp-border-down-1"
          >
            <svg-icon
              :name="`hcp-num-${index + 1}`"
              class="hcp-num-svg"
            ></svg-icon>
            <div class="inner">
              <div class="doctor-name">{{ item.rhcpName }}</div>
              <div class="hcp-mt-8">
                <div class="detail flex">
                  <div class="flex align-center">
                    <svg-icon name="username" class="user-icon" />
                    <span>{{ item.rhcpTitle }}</span>
                  </div>

                  <div class="flex align-center left-border">
                    <svg-icon name="position" class="user-icon" />
                    <span>{{ item.rhcpSpecialty }}</span>
                  </div>
                </div>
                <div class="detail hcp-mt-8 flex align-center">
                  <svg-icon name="hosipital" class="user-icon" />
                  <span>{{ item.rhcpHcoName }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-for="(item, index) in pageInfo.focusTops" :key="index">
        <HcpBasicTitle :title="`最常参与的Top3${item.title}：`" />
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

<script setup lang="ts" name="AttendingPreference">
import { ref, reactive, computed } from "vue";
import HcpBasicTitle from "@/components/base/HcpBasicTitle.vue";
import HcpBasicTag from "@/components/base/HcpBasicTag.vue";
import BasicNoData from "@/components/base/HcpNoData.vue";

import { getCustomerEventPreference } from "@/api";
import { serializeData } from "../../utils/index";

const isShowLastParagraph = computed(() => {
  return pageInfo.attendingCountAvg !== (-1 as any);
});

const pageInfo = reactive({
  potential: "",
  attendingCount: "",
  attendingCountAvg: "",
  bestAudiences: [],
  bestSpeakers: [],
  eventType: "",
  focusTops: []
});

const checkEmptyData = v => v !== "" && v !== null && v !== undefined;

const isShowBlock = ref(true);

const isHasData: any = computed({
  get() {
    return isShowBlock.value;
  },
  set(v) {
    isShowBlock.value = v;
  }
});

function combinePageData(data) {
  if (Array.isArray(data)) {
    const serializeFocusData = serializeData(data);
    const result = [];
    for (const item of serializeFocusData) {
      const [key, value] = item;
      result.push({
        title: key,
        tags: value
      });
    }
    return result;
  }
}
async function init() {
  const res = await getCustomerEventPreference();

  Object.assign(pageInfo, {
    ...res,
    bestAudiences: res.bestAudiences || [],
    bestSpeakers: res.bestSpeakers || [],
    focusTops: combinePageData(res.focusTops)
  });

  const isShow =
    checkEmptyData(res?.attendingCount) ||
    checkEmptyData(res?.attendingCountAvg) ||
    res?.bestAudiences?.length > 0 ||
    res?.bestSpeakers?.length > 0 ||
    checkEmptyData(res?.eventType) ||
    res?.focusTops?.length > 0;
  isHasData.value = isShow;
}

init();

const isLeftTabActive = ref(true);

const doctorMembers = computed(() => {
  return isLeftTabActive.value ? pageInfo.bestSpeakers : pageInfo.bestAudiences;
});

const leftTabClick = () => {
  isLeftTabActive.value = true;
};

const rightTabClick = () => {
  isLeftTabActive.value = false;
};
</script>

<style scoped lang="less">
.hight-active-color {
  color: var(--van-primary-color);
  margin: 0 2px;
}

.main-content-text {
  font-size: 14px;
  color: #3c4242;
}

.tab-two-wrapper {
  .right-info {
    font-size: 10px;
    color: #cccccc;
    text-align: right;
  }
  .top-content-abstract {
    .highlight {
      color: var(--van-primary-color);
    }
  }

  .first-three-container {
    position: relative;
    right: 8px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 327px;
    height: 330px;
    background-position: center, center;
    background-repeat: no-repeat, no-repeat;
    background-size: 100%, 100%;
    transition: all linear 0.2s;

    &.right-active {
      background-image: url(../../../../assets/hcp-right-active.png),
        url(../../../../assets/hcp-normal-bg.png);

      .tabs {
        font-size: 12px;
        font-weight: 400;
        letter-spacing: 0px;
        color: rgba(138, 142, 142, 1);
        height: 50px;

        .left-tab {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .right-tab {
          font-size: 14px;
          font-weight: 600;
          line-height: 20px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--van-primary-color);
        }
      }
    }

    &.left-active {
      background-image: url(../../../../assets/hcp-left-active.png),
        url(../../../../assets/hcp-normal-bg.png);

      .tabs {
        font-size: 12px;
        font-weight: 400;
        letter-spacing: 0px;
        color: rgba(138, 142, 142, 1);
        height: 50px;

        .left-tab {
          font-size: 14px;
          font-weight: 600;
          line-height: 20px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--van-primary-color);
        }

        .right-tab {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .member-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 15px 20px;

      .hcp-border-down-1 {
        border-bottom: 1px solid #eee;
        padding-bottom: 12px;
      }

      .hcp-num-svg {
        width: 7px;
        height: 14px;
        margin-right: 16px;
      }

      .inner {
        .doctor-name {
          font-weight: 500;
          font-size: 14px;
          color: #3c4242;
          line-height: 18px;
        }
        .user-icon {
          width: 12px;
          height: 12px;
        }
        .detail {
          font-weight: 400;
          font-size: 12px;
          color: #3c4242;
          line-height: 14px;
          span {
            margin-left: 8px;
          }
        }
        .hcp-mt-8 {
          margin-top: 8px;
          .left-border {
            padding-left: 12px;
            border-left: solid 1px #ccc;
            margin-left: 12px;
          }
        }
      }
    }
  }
}
</style>
