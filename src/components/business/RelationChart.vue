<template>
  <div ref="relationShipRef" class="relation-box"></div>
</template>

<script setup lang="ts" name="RelationChart">
import {
  ref,
  onMounted,
  Ref,
  watch,
  reactive,
  onBeforeUnmount,
  nextTick
} from "vue";

import { useECharts } from "@/components/Echarts/useEchart";

const isMounted = ref(false);
const emits = defineEmits<{
  (e: "change-card", data: any): void;
}>();

const props = defineProps<{
  chartData: Array<any>;
}>();
const relationShipRef = ref<HTMLDivElement | null>(null);
const { setOption, getInstance } = useECharts(
  relationShipRef as Ref<HTMLDivElement>,
  true
);

const chartInstance = ref(null);

const option: any = reactive({
  title: {
    text: ""
  },
  legend: [
    {
      data: ["人物关系"],
      show: false
    }
  ],
  tooltip: {
    show: false
  },

  series: [
    {
      type: "graph",
      // layout: "force", //关闭力引导控制
      layout: "none",
      symbolSize: 32,
      draggable: false,
      roam: false,
      categories: [
        {
          name: "人物关系"
        }
      ],

      label: {
        show: true, //是否显示标签。
        color: "#8A8E8E",
        fontStyle: "normal", //文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
        fontWeight: "bolder", //'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
        fontSize: 8 //字体大小
      },
      data: [],
      links: [],

      itemStyle: {
        color: "#FCFCFC",
        borderWidth: 1,
        borderColor: "#830051"
      },
      lineStyle: {
        color: "#CCC",
        type: "dashed",
        opacity: 1,
        width: 1,
        curveness: 0,
        cap: "round"
      },
      emphasis: {
        focus: "adjacency",
        scale: false,
        lineStyle: {
          color: "#9B3273"
        },
        itemStyle: {
          color: "#9B3273",
          borderWidth: 1,
          borderColor: "#830051",
          shadowColor: "rgba(131,0,81,0.3)",
          shadowBlur: 8,
          shadowOffsetX: 0,
          shadowOffsetY: 2
        },
        label: {
          show: true,
          color: "#fff"
        }
      }
    }
  ],
  nodeLayout: {
    type: "none"
  }
});

function doData(arr = []) {
  const { centerX, centerY, edgeWidth, startAngle, angleInterval } =
    setPosition();

  let copyArr = JSON.parse(JSON.stringify(arr));
  const result: any = {
    nodes: [],
    links: []
  };
  for (let i = 0; i < copyArr.length; i++) {
    const item = copyArr[i];
    if (i === 0) {
      result.nodes.push({
        ...item,
        name: item?.hcpName,
        id: `${10000 + i}`,
        category: 0,
        symbolSize: 68,
        x: centerX,
        y: centerY,

        itemStyle: {
          color: "#fff",
          borderWidth: 2,
          borderColor: "#830051"
        },
        emphasis: {
          label: {
            color: "#fff"
          },
          itemStyle: {
            borderColor: "#f4e4eeFF",
            color: "#9B3273",
            shadowColor: "rgba(131,0,81,0.3)"
          }
        },
        label: {
          show: true,
          color: "#830051",
          fontStyle: "normal",
          fontSize: 16
        }
      });
    } else {
      const angle = startAngle + (i - 1) * angleInterval;
      const childX = centerX + edgeWidth * Math.cos(angle);
      const childY = centerY + edgeWidth * Math.sin(angle);
      if (i === 1) {
        result.nodes.push({
          ...item,
          name: item?.rhcpName,
          id: `${10000 + i}`,
          symbolSize: 48,
          itemStyle: {
            color: "#9B3273",
            borderWidth: 1,
            borderColor: "#830051",
            shadowColor: "rgba(131,0,81,0.3)",
            shadowBlur: 8,
            shadowOffsetX: 0,
            shadowOffsetY: 2
          },
          x: childX,
          y: childY,
          label: {
            show: true,
            color: "#fff",
            fontStyle: "normal",
            fontSize: 13 //字体大小
          }
        });
      } else if (i === 2) {
        result.nodes.push({
          ...item,
          name: item?.rhcpName,
          id: `${10000 + i}`,
          symbolSize: 48,
          itemStyle: {
            color: "#B36495",
            borderWidth: 1,
            borderColor: "#830051"
          },
          x: childX,
          y: childY,
          label: {
            show: true,
            color: "#fff",
            fontStyle: "normal",
            fontSize: 13 //字体大小
          }
        });
      } else if (i === 3) {
        result.nodes.push({
          ...item,
          name: item?.rhcpName,
          id: `${10000 + i}`,
          symbolSize: 48,
          itemStyle: {
            color: "#CA95B6",
            borderWidth: 1,
            borderColor: "#B36495"
          },
          x: childX,
          y: childY,
          label: {
            show: true,
            color: "#fff",
            fontStyle: "normal",
            fontSize: 13 //字体大小
          }
        });
      } else {
        result.nodes.push({
          ...item,
          x: childX,
          y: childY,
          name: item?.rhcpName,
          id: `${10000 + i}`
        });
      }
    }
    result.links.push({
      source: "10000",
      target: `${10000 + i + 1}`
    });
  }
  return result;
}

watch(
  () => props.chartData,
  newVal => {
    if (isMounted.value) {
      const tranData = doData(newVal);
      option.series[0].data = tranData.nodes;
      option.series[0].links = tranData.links;
      nextTick(() => {
        setOption(option);
      });
    }
  },
  { deep: true, flush: "post" }
);

const chartClick = params => {
  if (params.componentType === "series") {
    if (params.seriesType === "graph") {
      if (params.dataType === "edge") {
        // 点击到了 graph 的 edge（边）上。
      } else {
        emits("change-card", {
          data: params.data,
          isParent: params.data?.isParent
        });
      }
    }
  }
};

function setPosition() {
  const wrapperRefDOM = relationShipRef.value;
  const { width, height } = wrapperRefDOM.getBoundingClientRect();
  // 中心点 横坐标
  const centerX = width / 2;
  // 中心点纵坐标
  const centerY = height / 2;
  // 连线长度
  const edgeWidth = 50;
  // 子元素预设数量 暂时先写死  后面需要动态放开 根据数量来判断
  const childCount = 10;
  // 定义子节点起始角度
  const startAngle = -Math.PI / 2 - Math.PI / 6;
  // 定义子节点间角度间隔
  const angleInterval = (Math.PI * 2) / childCount;
  return {
    centerX,
    centerY,
    edgeWidth,
    startAngle,
    angleInterval
  };
}

onMounted(() => {
  isMounted.value = true;
  setOption(option);
  chartInstance.value = getInstance();
  chartInstance.value.on("click", chartClick);
});
onBeforeUnmount(() => {
  isMounted.value = false;
  chartInstance.value?.off("click", chartClick);
});
</script>

<style scoped lang="less">
.relation-box {
  width: 100%;
  height: 250px;
}
</style>
