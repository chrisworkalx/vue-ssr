<template>
  <div class="hcp-hot-area-wrapper">
    <slot name="head"> </slot>
    <table>
      <!-- 头部信息 -->
      <thead>
        <tr>
          <td v-for="(h, index) in headers" :key="index">{{ h }}</td>
        </tr>
      </thead>
      <tr></tr>
      <!-- 主体信息 -->
      <tbody>
        <tr
          v-for="(t, tIndex) in tbodyData"
          :key="tIndex"
          :class="[{ oddTr: tIndex % 2 !== 0 }]"
        >
          <td
            v-for="(d, dIndex) in t"
            :key="dIndex"
            :class="[
              {
                level0: dIndex !== 0 && d === 0,
                level1: dIndex !== 0 && d === 1,
                level2: dIndex !== 0 && d === 2,
                level3: dIndex !== 0 && d === 3,
                level4: dIndex !== 0 && d === 4,
                level5: dIndex !== 0 && d === 5
              }
            ]"
          >
            {{ dIndex === 0 ? d : "" }}
          </td>
        </tr>
      </tbody>
    </table>
    <slot name="footer">
      <div class="bottom-title">
        展示前五偏好时段，颜色越深，表示客户更偏好在该时段阅读
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts" name="HcpHotArea">
import { computed } from "vue";
import { sortArrByType } from "@/utils/util";

const props = defineProps<{
  hotData: Array<any>;
}>();

const headers = ["", "一", "二", "三", "四", "五", "六", "日"];

const tbodyData = computed(() => {
  const sortArrByTime = sortArrByType(props.hotData, "timeKey", "weight");
  return doData(sortArrByTime);
});

// const res = {
//   "08:00-10:00": [0, 1, 3, 0, 3, 1, 2],
//   "10:00-12:00": [1, 1, 0, 1, 2, 1, 0],
//   "12:00-14:00": [3, 1, 1, 2, 0, 1, 2],
//   "14:00-16:00": [1, 0, 3, 2, 3, 1, 0],
//   "16:00-18:00": [0, 3, 2, 0, 3, 2, 2]
// };

// const tbodyData = ref([]);

function doData(obj) {
  return Object.keys(obj).reduce((target, nextKey) => {
    const timeValue = obj[nextKey];
    timeValue.unshift(nextKey);
    target.push(timeValue);
    return target;
  }, []);
}

// const filterData = doData(res);

// tbodyData.value = filterData;

// console.log("filterData", filterData);
</script>

<style scoped lang="less">
.hcp-hot-area-wrapper {
  .bottom-title {
    background: linear-gradient(270deg, #ecccdd 0%, #830051 100%);
    border-radius: 2px;
    font-weight: 400;
    font-size: 10px;
    color: #ffffff;
    line-height: 18px;
    height: 18px;
    padding-left: 10px;
    margin-top: 15px;
  }
  table,
  th,
  td {
    border: 1px solid #fff;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    border: solid 1px #fff;
    thead {
      tr {
        width: 100%;
        height: 32px;
        opacity: 1;
        border-radius: 4px 0px, 0px, 0px;
        background: rgba(255, 244, 250, 1);
        font-size: 12px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 17.38px;
        color: rgba(60, 66, 66, 1);
        td {
          text-align: center;
          &:nth-child(1) {
            width: 72px;
          }
          &:nth-last-child(1),
          &:nth-last-child(2) {
            background-color: rgba(255, 233, 245, 1);
          }
        }
      }
    }

    tbody {
      tr {
        width: 100%;
        height: 32px;
        &.oddTr {
          background: rgba(254, 249, 252, 1);
        }

        td {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0px;
          color: rgba(60, 66, 66, 1);
          text-align: center;
          &.level0 {
            background: rgba(254, 249, 252, 1);
          }
          &.level1 {
            background: rgba(230, 204, 220, 1);
          }
          &.level2 {
            background: rgba(204, 153, 185, 1);
          }
          &.level3 {
            background: rgba(179, 102, 151, 1);
          }
          &.level4 {
            background: rgba(154, 51, 116, 1);
          }
          &.level5 {
            background: rgba(131, 0, 81, 1);
          }
        }
      }
    }
  }
}
</style>
