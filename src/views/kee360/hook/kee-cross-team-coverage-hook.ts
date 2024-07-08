import { reactive, ref, nextTick, watch } from "vue";
import {
  getKeeCrossTeamCoverageCardList,
  getKeeCrossTeamCoverageOptions
} from "@/api/kee360";

const isEmpty = v => v === undefined || v === null || v === "";
const setValue = v => (!isEmpty(v) ? v + "次" : "-");

export const useKeeCrossTeamCoverage = () => {
  const customFieldName = {
    text: "item",
    value: "itemId",
    children: "children"
  };
  const fields = reactive({
    team: "",
    brand: "",
    mtd: ""
  });

  const pickModelValue = reactive({
    team: [""],
    brand: [""],
    mtd: [""]
  });

  const options = reactive({
    team: [],
    brand: [],
    mtd: []
  });

  const coverageCards: any = ref([
    {
      title: "担任讲者次数",
      value: "-",
      imageName: "c-2"
    },
    {
      title: "参会次数",
      value: "-",
      imageName: "c-1"
    },
    {
      title: "拜访次数",
      value: "-",
      imageName: "c-3"
    },
    {
      title: "e学荟文章转发次数",
      value: "-",
      imageName: "c-4"
    }
  ]);

  async function getSelectOptions(type: "team" | "product" | "time_period") {
    const res = await getKeeCrossTeamCoverageOptions({
      item: type,
      productId: pickModelValue.brand[0],
      teamId: pickModelValue.team[0],
      timePeriodId: pickModelValue.mtd[0]
    });
    return res;
  }
  async function getCoverageCards() {
    // TODO
    const res = await getKeeCrossTeamCoverageCardList({
      productId: pickModelValue.brand?.[0],
      teamId: pickModelValue.team?.[0],
      timePeriodId: pickModelValue.mtd?.[0]
    });

    coverageCards.value[0].value = setValue(res.asSpeakerCount);
    coverageCards.value[1].value = setValue(res.meetingJoinCount);
    coverageCards.value[2].value = setValue(res.callCount);
    coverageCards.value[3].value = setValue(res.exuehuiPropogate);
  }

  async function initData() {
    const [res1, res2, res3] = await Promise.all([
      getSelectOptions("team"),
      getSelectOptions("product"),
      getSelectOptions("time_period")
    ]);

    Object.assign(fields, {
      team: res1?.[0]?.item || "",
      brand: res2?.[0]?.item || "",
      mtd: res3?.[0]?.item || ""
    });

    Object.assign(options, {
      team: res1 || [],
      brand: res2 || [],
      mtd: res3 || []
    });

    Object.assign(pickModelValue, {
      team: [!isEmpty(res1?.[0]?.itemId) ? res1?.[0]?.itemId : ""],
      brand: [!isEmpty(res2?.[0]?.itemId) ? res2?.[0]?.itemId : ""],
      mtd: [!isEmpty(res3?.[0]?.itemId) ? res3?.[0]?.itemId : ""]
    });

    nextTick(() => {
      getCoverageCards();
    });
  }

  async function focusFetch(reactiveKey: string, apiKey: string) {
    const op: any = await getSelectOptions(
      apiKey as "team" | "product" | "time_period"
    );
    options[reactiveKey] = op || [];
    fields[reactiveKey] = op?.[0]?.item || "";
    // pickModelValue[reactiveKey] = isEmpty(op?.[0]?.itemId)
    //   ? [""]
    //   : [op?.[0]?.itemId];
    nextTick(() => {
      getCoverageCards();
    });
  }

  async function handleTeamOpen() {
    // 请求team options
    await focusFetch("team", "team");
  }

  async function handleBrandOpen() {
    // 请求brand options
    await focusFetch("brand", "product");
  }

  async function handleMTDOpen() {
    // 请求mtd options
    await focusFetch("mtd", "time_period");
  }

  const onConfirm = ({ selectedOptions }, hide, type) => {
    fields[type] = selectedOptions[0]?.item;
    pickModelValue[type] = [
      !isEmpty(selectedOptions?.[0]?.itemId) ? selectedOptions?.[0]?.itemId : ""
    ];
    nextTick(() => {
      getCoverageCards();
    });
    hide();
  };

  const handleCancel = hide => {
    hide();
  };

  initData();

  return {
    coverageCards,
    onConfirm,
    handleCancel,
    pickModelValue,
    handleTeamOpen,
    handleBrandOpen,
    handleMTDOpen,
    fields,
    options,
    customFieldName
  };
};
