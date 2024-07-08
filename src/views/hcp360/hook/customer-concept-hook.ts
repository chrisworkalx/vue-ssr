import { ref, watch, provide, computed, nextTick } from "vue";
import { getAccessLastAconceptResults } from "@/api/index";
import { useToGetOptions } from "@/hooks/options-hook";
import { isNotEmpty } from "@/utils/util";

const formatDate = date => {
  const reg = /(\d{4})\/(\d{2})\/(\d{2})\s+(\d{2})[:：](\d{2})/;
  return date.replace(reg, "$2/$3/$1 $4:$5");
};

const isEmpty = v => v === "" || v === null || v === undefined;
export const useCustomerConcept = () => {
  const {
    cascaderValue,
    options,
    fieldValue,
    fieldNames,
    searchFirstValue,
    searchSecondValue,
    searchThirdValue,
    defaultOption,
    cacheOptions
  } = useToGetOptions("attitude");

  const basicTabRef = ref(null);

  const isOnSearch = ref(false);

  const tooltip = ref(
    "每月/周/日会议、微信转发中客户最近一次填写的品牌KM观念调研结果，如无客户填写数据，则取最近一次拜访中相关观念，都没有填写则继承上一个月/周/日"
  );
  const activeTab = ref("month");

  const hasData = ref(true);

  const isHasEchartData = ref([true, false, false]);

  const handleUpdateTabKey = key => {
    activeTab.value = key;
  };

  const resultList = ref<any>([]);

  const handleFinish = ({ selectedOptions }) => {
    const selectValues = selectedOptions.map(s => s.copyValue);
    const fieldValueText = selectedOptions
      .map(option => option.label)
      .join("-");
    fieldValue.value = fieldValueText;
    searchFirstValue.value = selectValues[0];
    searchSecondValue.value = selectValues[1];
    searchThirdValue.value = selectValues[2];
  };

  const handleSearch = ({ name, isSearch }) => {
    const _options = isNotEmpty(name)
      ? cacheOptions.value.filter(item => item?.label?.includes(name))
      : JSON.parse(JSON.stringify(cacheOptions.value));
    options.value = _options;
    isOnSearch.value = isSearch;
    cascaderValue.value = "";
  };

  const handleChange = ({ deepValue, combineValue }) => {
    cascaderValue.value = "";
    nextTick(() => {
      defaultOption.value = combineValue;
      cascaderValue.value = deepValue;
      const fieldValueText = combineValue.map(option => option.label).join("-");
      fieldValue.value = fieldValueText;
      searchFirstValue.value = combineValue[0]?.copyValue || "";
      searchSecondValue.value = combineValue[1]?.copyValue || "";
      if (combineValue?.length === 3) {
        searchThirdValue.value = combineValue[2]?.copyValue || "";
      }
    });
  };

  //获取最近一次填写结果
  async function getAccessLastAconceptResultsApi(val) {
    if (!isEmpty(val)) {
      const res = await getAccessLastAconceptResults({
        brandId: searchFirstValue.value,
        familyId: searchSecondValue.value,
        indicationId: val
      });

      hasData.value = res?.length > 0;

      resultList.value =
        res?.map(r => ({
          ...r,
          kmFillDate: formatDate(r?.kmFillDate || "")
        })) || [];
    }
  }

  function setHasData(v, index) {
    isHasEchartData.value[index] = v;
  }

  watch(
    searchThirdValue,
    v => {
      if (!v) {
        hasData.value = false;
        isHasEchartData.value = [false, false, false];
      }

      getAccessLastAconceptResultsApi(v);
    },
    {
      immediate: true
    }
  );

  const isShowBlock = computed(() => {
    return hasData.value || isHasEchartData.value.some(item => item === true);
  });
  provide("searchFirstValue", searchFirstValue);
  provide("searchSecondValue", searchSecondValue);
  provide("searchThirdValue", searchThirdValue);
  provide("setHasData", setHasData);
  return {
    fieldValue,
    cascaderValue,
    options,
    fieldNames,
    handleFinish,
    resultList,
    activeTab,
    basicTabRef,
    searchThirdValue,
    handleUpdateTabKey,
    hasData,
    isHasEchartData,
    isShowBlock,
    defaultOption,
    handleChange,
    tooltip,
    handleSearch
  };
};
