import { onMounted, Ref, ref, nextTick, unref, onBeforeUnmount } from "vue";
import { useECharts } from "@/components/Echarts/useEchart";
import { onClickOutside } from "@vueuse/core";

const typeMaps = {
  1: "反对",
  2: "中立",
  3: "支持"
};

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

const deepSetEchartsOptions = (originConfig, newConfig) => {
  //对象的深层次赋值
  originConfig = originConfig || {};
  newConfig = newConfig || null;
  for (const key in newConfig) {
    if (originConfig[key] instanceof Object && !Array.isArray(newConfig[key])) {
      deepSetEchartsOptions(originConfig[key], newConfig[key]);
      continue;
    }

    originConfig[key] = newConfig[key];
  }

  return originConfig;
};

const defaultSetting = initConfig => {
  initConfig = initConfig || {
    typeMaps
  };
  return {
    title: {
      text: ""
    },
    legend: {
      type: "scroll",
      data: [], //图例3种
      bottom: "2%",
      icon: "rect",
      itemWidth: 14,
      itemHeight: 2,
      padding: [2, 2],
      textStyle: {
        color: "#8A8E8E",
        fontSize: 10
      },
      tooltip: {
        show: true,
        textStyle: {
          fontSize: 8,
          color: "#3C4242",
          lineHeight: 14
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
          const _left = left + 186 > 357 ? halfLeft : left;
          return [_left, top + 16];
        },
        formatter: function (params) {
          const [title, value] = params.name?.split("||") || ["", ""];
          return `<div style="max-width:100%;overflow:hidden;">
          <div style="width:100%;white-space:wrap;word-break:break-all;">${title}</div>
          <div style="text-align:right;margin-top: 8px;color:#8A8E8E;">${value}</div>
          </div>`;
        },
        extraCssText:
          "box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.1);border-radius: 2px;width:186px;"
      },
      formatter: function (name) {
        return name.length > 4
          ? name.substr(0, 4) + "..."
          : name.split("||")[0];
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      top: 14,
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
        fontSize: 8,
        interval: 0,
        rotate: 45
      }
    },
    tooltip: {
      trigger: "axis",
      triggerOn: "click",
      formatter: function (params) {
        let res =
          "<div style='margin-bottom:4px;padding:0 10px;width:100%;height:24px;line-height:24px;background:#f2e5ed;border-radius:3px;font-size: 12px;'><p>" +
          params[0]?.name +
          " </p></div>";
        params = params.filter(p => p?.data?.value);

        for (let i = 0; i < params.length; i++) {
          const seriesName = params[i].seriesName;
          res += `<div style="font-size: 10px; padding:0 12px;line-height: 24px">
                    ${
                      params[i]?.data?.isMarked
                        ? `<span style="width: 0;height: 0;margin-right:5px;display:inline-block;border-left:4px solid transparent;border-right: 4px solid transparent;border-bottom: 8px solid ${params[i].color};"></span>`
                        : `
                      <span style="display:inline-block;margin-right:5px;border-radius:50%;width:8px;height:8px;background-color:${[
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
                        ? caculateToolType(
                            [params[i].data.value],
                            initConfig.typeMaps
                          )
                        : caculateToolType(
                            [params[i].data],
                            initConfig.typeMaps
                          )
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

      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed"
        }
      },

      axisLabel: {
        backgroundColor: "#f6e5efFF",
        color: "#ab0165FF",
        padding: [3, 4],
        fontSize: 10,
        formatter: function (value) {
          return initConfig.typeMaps[value];
        }
      }
    },
    toolbox: {
      show: false
    },
    series: []
  };
};

function caculateToolType(v: any, mapType) {
  const intV = parseInt(v, 10);

  return mapType[intV as 1 | 2 | 3];
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
            symbolSize: 5,
            dataIndex: i,
            symbol: i === item.markIndex ? "triangle" : "emptyCircle",
            symbolOffset: [0, 0],
            isMarked: item.markIndex === i,
            markIndex: item.markIndex
          };

          if ($$item.isMarked) {
            $$item.symbolSize = 9;
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
          symbolSize: 5,
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
export function useCommonLineChart(echartsConfig?: object, extraConfig?: any) {
  echartsConfig = echartsConfig || {};
  extraConfig = extraConfig || null;

  const isMounted = ref(false);
  const MyChart = ref<HTMLDivElement | null>(null);

  const mergeConfig = deepSetEchartsOptions(
    defaultSetting(extraConfig),
    echartsConfig
  );
  const options = ref<any>(mergeConfig);

  const { setOption, getInstance } = useECharts(
    MyChart as Ref<HTMLDivElement>,
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

  async function fillChartData(result: any = {}) {
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
            width: 2,
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

    const { lendgendName, xName, series } = doData(resOptions) as any;

    const config = deepSetEchartsOptions(
      defaultSetting(extraConfig),
      echartsConfig
    );
    const combineConfig = {
      ...config,
      legend: {
        ...config.legend,
        data: lendgendName?.map((l, LIndex) => {
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
      setTimeout(() => {
        if (curEchartInstance.value) {
          curEchartInstance.value?.clear();
        }
        setOption(combineConfig);
      }, 200);
    });
  }

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
          c.lineStyle.width = 4;
          c.z = 9999;
        } else {
          c.isLengendClick = false;
          c.lineStyle.width = 2;
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
        c.lineStyle.width = 2;
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

  onClickOutside(MyChart, () => {
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
    curEchartInstance.value.on("legendselectchanged", legendselectchanged);
  });

  onBeforeUnmount(() => {
    isMounted.value = false;
  });

  return {
    MyChart,
    options,
    fillChartData,
    isMounted
  };
}
