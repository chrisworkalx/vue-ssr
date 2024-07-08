import {
  onMounted,
  inject,
  watch,
  Ref,
  ref,
  nextTick,
  unref,
  onBeforeUnmount
} from "vue";
import { getConceptResultsStatisticsApi } from "@/utils/service";
import { useECharts } from "@/components/Echarts/useEchart";
import { onClickOutside } from "@vueuse/core";
import { px2vw } from "@/utils/util";
const defaultColors = [
  "#830051",
  "#F0AB00",
  "#C4D600",
  "#003864",
  "#68D2DF",
  "#634075",
  "#C4D600",
  "#656969"
];
function getRandomColor() {
  // 生成随机的RGB颜色值
  const r = Math.floor(Math.random() * 256); // 0 到 255 之间的随机整数
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  // 将RGB值转换成十六进制表示
  const hex =
    "#" +
    r.toString(16).padStart(2, "0") +
    g.toString(16).padStart(2, "0") +
    b.toString(16).padStart(2, "0");
  return hex;
}

function setChartColor(index: number) {
  return defaultColors[index] || getRandomColor();
}

const typeMaps = {
  1: "反对",
  2: "中立",
  3: "支持"
};

const defaultSetting = () => ({
  title: {
    text: ""
  },
  legend: {
    type: "scroll",
    data: [], //图例3种
    bottom: "2%",
    icon: "rect",
    itemWidth: px2vw(14),
    itemHeight: px2vw(2),
    padding: [px2vw(2), px2vw(2)],
    textStyle: {
      color: "#8A8E8E",
      fontSize: px2vw(10)
    },
    tooltip: {
      show: true,
      textStyle: {
        fontSize: px2vw(8),
        color: "#3C4242",
        lineHeight: px2vw(14)
      },
      position: function (...args) {
        const [left, top] = args[0];

        const size = args[args.length - 1];
        const {
          contentSize,
          viewSize
        }: {
          contentSize: Array<number>;
          viewSize: Array<number>;
        } = size;

        const halfLeft = Math.ceil((viewSize[0] - contentSize[0]) / 2);
        // const halfRight = Math.ceil((viewSize[1] - contentSize[1]) / 2);
        const _left = left + 186 > 357 ? halfLeft : left;
        // return [halfLeft, halfRight];
        return [_left, top + 16];
      },
      formatter: function (params) {
        const [title, value] = params.name?.split("||") || ["", ""];
        return `<div style="max-width:100%;overflow:hidden;">
        <div style="width:100%;white-space:pre-wrap;word-break:break-all;overflow-wrap: break-word;">${title}</div>
        <div style="text-align:right;margin-top: ${px2vw(
          8
        )}px;color:#8A8E8E;">${value}</div>
        </div>`;
      },
      extraCssText: `box-shadow: 0px 0px ${px2vw(
        8
      )}px 0px rgba(0,0,0,0.1);border-radius: ${px2vw(2)}px;width:${px2vw(
        186
      )}px;`
    },
    formatter: function (name) {
      const maxName = name.length > 4 ? name.substr(0, 4) + "..." : name;
      const [title, value] = maxName?.split("||") || ["", ""];
      return `${title}${value ? "_" + value : ""}`;
    }
  },
  grid: {
    left: "2%",
    right: "2%",
    top: px2vw(14),
    bottom: "12%",
    containLabel: true
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [], //x轴坐标
    axisLine: {
      lineStyle: {
        color: "#8A8E8E"
      }
    },
    axisLabel: {
      color: "#8A8E8E",
      fontSize: px2vw(8),
      interval: 0,
      rotate: 45
    }
  },
  tooltip: {
    trigger: "axis",
    triggerOn: "click",
    formatter: function (params) {
      let res = `<div style='margin-bottom:${px2vw(4)}px;padding:0 ${px2vw(
        10
      )}px;width:100%;height:${px2vw(24)}px;line-height:${px2vw(
        24
      )}px;background:#f2e5ed;border-radius:3px;font-size: ${px2vw(
        12
      )}px;'><p>${params[0]?.name}</p></div>`;
      params = params.filter(p => p?.data?.value);

      for (let i = 0; i < params.length; i++) {
        const seriesName = params[i].seriesName;
        res += `<div style="font-size: ${px2vw(10)}px; padding:0 ${px2vw(
          12
        )}px;line-height: ${px2vw(24)}px">
                  ${
                    params[i]?.data?.isMarked
                      ? `<span style="width: 0;height: 0;margin-right:5px;display:inline-block;border-left:4px solid transparent;border-right: 4px solid transparent;border-bottom: 8px solid ${params[i].color};"></span>`
                      : `
                    <span style="display:inline-block;margin-right:5px;border-radius:50%;width:${px2vw(
                      8
                    )}px;height:${px2vw(8)}px;background-color:${[
                          params[i].color
                        ]};"></span>
                  `
                  }
                  ${
                    seriesName.length > 4
                      ? seriesName.substr(0, 4) + "..."
                      : seriesName
                  }
                  <span style="color: #ab0165;">${
                    typeof params[i].data === "object"
                      ? caculateToolType(params[i].data.value)
                      : caculateToolType(params[i].data)
                  }</span>
                </div>`;
      }
      return res; // 经过这么一加工，最终返回出去并渲染，最终就出现了我们所看的效果
    }
  },
  yAxis: {
    type: "value",
    interval: 1,
    min: 1,
    max: 3,

    splitLine: {
      show: true,
      lineStyle: {
        type: "dashed"
      }
    },

    axisLabel: {
      backgroundColor: "#f6e5efFF",
      color: "#ab0165FF",
      padding: [px2vw(3), px2vw(4)],
      fontSize: px2vw(10),
      formatter: function (value) {
        return typeMaps[value];
      }
    }
  },
  toolbox: {
    show: false
  },
  series: []
});

function caculateToolType(v: any) {
  const intV = Math.round(v);

  return typeMaps[intV as 1 | 2 | 3];
}

function transData(
  list: Array<{
    data: Array<number>;
    [p: string]: any;
  }>
) {
  const copyList = JSON.parse(JSON.stringify(list));

  const copyData = copyList?.map((item: any) => {
    return {
      ...item,
      data:
        item.data.map((c: any, i: number) => {
          const $$item: any = {
            value: c > 0 ? c : "",
            symbolSize: px2vw(5),
            dataIndex: i,
            symbol: i === item.markIndex ? "triangle" : "emptyCircle",
            symbolOffset: [0, 0],
            isMarked: item.markIndex === i,
            markIndex: item.markIndex
          };

          if ($$item.isMarked) {
            $$item.symbolSize = px2vw(9);
          }
          return $$item;
        }) || []
    };
  });

  const $copyData = copyData.map((d: any) => d.data);
  const cacheCopyList: Array<any> = JSON.parse(JSON.stringify(list)).map(
    (item: any) => {
      return (
        item?.data?.map((c: any, i: number) => ({
          value: c > 0 ? c : "",
          symbolSize: px2vw(5),
          dataIndex: i
        })) || []
      );
    }
  );

  for (let i = 0, j = 0; i < $copyData.length; i++) {
    const item = $copyData[i];
    const copyItem = cacheCopyList[i];
    for (let k = 0; k < item.length; k++) {
      const singleValue = item[k]?.value;
      while (j + 1 < $copyData.length) {
        const nextItem = $copyData[j + 1];
        const copyNextItem = cacheCopyList[j + 1];
        // k为0的情况
        if (k === 0) {
          const nextValue = copyItem[k + 1]?.value;
          const nextItemValue = copyNextItem[k + 1]?.value;
          if (
            singleValue &&
            singleValue === nextItem[k]?.value &&
            nextValue === nextItemValue
          ) {
            if (singleValue === 3) {
              // item[k]!.value -= 0.015;
              // item[k].symbolOffset = [0, item[k].symbolOffset[1] - 1];
              nextItem[k].symbolSize += 2;
            } else {
              // nextItem[k]!.value += 0.015;
              nextItem[k].symbolSize += 2;
              // nextItem[k].symbolOffset = [0, nextItem[k].symbolOffset[1] + 1];
            }
          }
        } else {
          // 不为0的情况
          const prevValue = copyItem[k - 1]?.value;
          const prevNextItemValue = copyNextItem[k - 1]?.value;
          if (
            singleValue &&
            singleValue === nextItem[k]?.value &&
            prevValue === prevNextItemValue
          ) {
            if (singleValue === 3) {
              // item[k]!.value -= 0.015;
              // item[k].symbolOffset = [0, item[k].symbolOffset[1] - 1];
              nextItem[k].symbolSize += 2;
            } else {
              // nextItem[k]!.value += 0.015;
              nextItem[k].symbolSize += 2;
              // nextItem[k].symbolOffset = [0, nextItem[k].symbolOffset[1] + 1];
            }
          }
        }
        j++;
      }
      j = i;
    }
    j = i + 1;
  }
  return copyData;
}
export function useDynamicChart(periodLength: string, curIndex: number) {
  const searchFirstValue: Ref<any> = inject("searchFirstValue");
  const searchSecondValue: Ref<any> = inject("searchSecondValue");
  const searchThirdValue: Ref<any> = inject("searchThirdValue");
  const setHasData: any = inject("setHasData");
  const MyEcharts = ref<HTMLDivElement | null>(null);
  const isMounted = ref(false);
  const options = ref<any>(defaultSetting());

  const { setOption, getInstance } = useECharts(
    MyEcharts as Ref<HTMLDivElement>,
    true
  );
  const curEchartInstance = ref<any>(null);

  function doData(obj) {
    const result = {
      legendName: [],
      xName: [],
      series: []
    };
    result.legendName = obj.legendName;
    result.xName = obj.xName;
    result.series = obj.series;
    return result;
  }

  function fillChartData(v) {
    getConceptResultsStatisticsApi({
      brandId: searchFirstValue.value,
      familyId: searchSecondValue.value,
      indicationId: v,
      periodLength
    }).then(res => {
      setHasData(
        res.lagendList && res.lagendList.length > 0 ? true : false,
        curIndex
      );
      const result: any = res || {};
      const transChartData = transData(result?.seriesDataList || []);
      const combineColors =
        transChartData.map((_, index) => {
          return setChartColor(index);
        }) || [];
      const resOptions = {
        legendName: result?.lagendList || [],
        series:
          transChartData?.map((t, index, arr) => ({
            ...t,
            name: t.km,
            type: "line",
            lineStyle: {
              width: px2vw(2),
              color: combineColors[index]
            },
            itemStyle: {
              color: combineColors[index]
            },
            maxZIndex: 9999,
            z: arr.length - index,
            cacheZIndex: arr.length - index,
            smooth: 0.2,
            isLengendClick: false
          })) || [],
        xName: result?.xdataListDesc || []
      };

      const { legendName, xName, series } = doData(resOptions) as any;

      const config = defaultSetting();
      const combineConfig = {
        ...config,
        legend: {
          ...config.legend,
          data: legendName?.map((l, LIndex) => {
            return {
              name: l,
              itemStyle: {
                color: combineColors[LIndex]
              }
            };
          })
        },
        xAxis: {
          ...config.xAxis,
          data: xName
        },
        series: [...config.series, ...series]
      };
      options.value = combineConfig;
      nextTick(() => {
        if (curEchartInstance.value) {
          curEchartInstance.value?.clear();
        }
        setOption(combineConfig);
      });
    });
  }

  watch(
    searchThirdValue,
    v => {
      if (v !== "" && v !== undefined && v !== null && isMounted.value) {
        fillChartData(v);
      }
    },
    { flush: "post" }
  );

  function legendselectchanged(params) {
    const cur_option = this.getOption();

    const cur_legend = cur_option.legend ?? [];

    const cur_series = cur_option.series ?? [];

    cur_option.legend = cur_legend.map(item => ({
      ...item,
      selected: Object.keys(item.selected).reduce((t, nextKey) => {
        t[nextKey] = true;
        return t;
      }, {})
    }));

    cur_series.forEach(c => {
      if (c.name === params.name) {
        if (!c.isLengendClick) {
          c.isLengendClick = true;
          c.lineStyle.width = px2vw(4);
          c.z = 9999;
        } else {
          c.isLengendClick = false;
          c.lineStyle.width = px2vw(2);
          c.z = c.cacheZIndex;
        }
        c.lineStyle.opacity = 1;
        c.itemStyle.opacity = 1;
      } else {
        c.isLengendClick = false;
      }
    });

    const isActiveClick = cur_series.some(c => c.isLengendClick);

    cur_series.forEach(c => {
      if (c.name !== params.name) {
        c.lineStyle.width = px2vw(2);
        c.lineStyle.opacity = isActiveClick ? 0.2 : 1;
        c.itemStyle.opacity = isActiveClick ? 0.2 : 1;
        c.z = c.cacheZIndex;
      }
    });

    cur_option.series = cur_series;
    nextTick(() => {
      setOption(cur_option);
      setOption(cur_option);
    });
  }

  onClickOutside(MyEcharts, () => {
    if (curEchartInstance.value) {
      curEchartInstance.value.dispatchAction({
        type: "hideTip"
      });
    }
  });
  onMounted(() => {
    isMounted.value = true;
    setOption(unref(options));
    curEchartInstance.value = getInstance();
    searchThirdValue.value && fillChartData(searchThirdValue.value);
    curEchartInstance.value.on("legendselectchanged", legendselectchanged);
  });

  onBeforeUnmount(() => {
    isMounted.value = false;
  });

  return {
    MyEcharts,
    options,
    curEchartInstance
  };
}
