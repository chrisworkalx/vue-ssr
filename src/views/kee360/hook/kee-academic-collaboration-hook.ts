import { ref, watch, nextTick } from "vue";
import { getBizHcpRelationship } from "@/api";
import { useCacheTokenStore } from "@/store/modules/cacheToken";

function reArrangeChartData(data: Array<any>, onlineUserName) {
  const copyData = JSON.parse(JSON.stringify(data));
  if (Array.isArray(copyData) && copyData.length > 0) {
    const parentName = copyData[0]?.hcpName;

    copyData.unshift({
      hcpName: parentName,
      isParent: true
    });
    return copyData;
  }
  return [];
}

export function useRelationShip() {
  const pickModelValue = ref(["全部"]);
  const fieldValue = ref("全部");
  const hasData = ref(true);
  const columns = [
    { text: "全部", value: "KEE全部" },
    { text: "文章转发", value: "文章转发" },
    { text: "共同参会", value: "共同参会" },
    { text: "同台合作", value: "同台合作" },
    { text: "论文合作", value: "论文合作" }
  ];

  const cacheTokenStore = useCacheTokenStore();

  const currentUserName = cacheTokenStore.userName;

  const chartData = ref<any>([]);

  const cardData = ref({});

  const onConfirm = ({ selectedOptions }, hide) => {
    fieldValue.value = selectedOptions[0]?.text;
    hide();
  };

  const handleCancel = hide => {
    hide();
  };

  async function getBizHcpRelationshipApi(type = "全部") {
    // 调用接口
    const res: any =
      (await getBizHcpRelationship({ relationType: type as any })) || [];
    /**
     * chartData数据更新
     * cardData数据更新
     */
    hasData.value = res?.length > 0;
    const reArrangeData = reArrangeChartData(res, currentUserName) || [];
    nextTick(() => {
      chartData.value = reArrangeData;
      //cardData 默认取中间节点
      const defaultCardData = res?.[0];
      cardData.value = defaultCardData;
    });
  }

  getBizHcpRelationshipApi();

  const handleChangeCard = ({ isParent, data }) => {
    const newCardData = !isParent
      ? chartData.value.find(c => c.rhcpName === data.rhcpName) || {}
      : chartData.value?.[1] || {};
    cardData.value = newCardData;
  };

  watch(fieldValue, (n, o) => {
    if (n !== o) {
      // 查询接口
      getBizHcpRelationshipApi(n);
    }
  });

  return {
    columns,
    fieldValue,
    chartData,
    cardData,
    onConfirm,
    handleCancel,
    handleChangeCard,
    hasData,
    pickModelValue
  };
}
