import { ref, watch, nextTick, computed } from "vue";
import { getKeeBrandList, getKeeMedicalUnderstandLadder } from "@/api/kee360";

import { getConceptResultsStatisticsApi } from "@/utils/service";
import { useToGetOptions } from "@/hooks/options-hook";

import { isNotEmpty } from "@/utils/util";

export const useMedicineConcept = () => {
  const isShow = ref(true);

  const { cascaderValue, options, fieldValue, fieldNames, cacheOptions } =
    useToGetOptions(
      "",
      async () => await getKeeBrandList(),
      false,
      ({ values }) => {
        getMedicineLevelApi(values?.[0]);
      }
    );

  const extraConfig = ref({
    typeMaps: {
      1: "怀疑者",
      2: "中立者",
      3: "支持者",
      4: "倡导者"
    }
  });
  const echartsConfig = ref({
    yAxis: {
      min: 0
    }
  });

  const brandOptions = computed(() => {
    return options.value?.map(o => ({
      label: o.label,
      value: o.value,
      copyValue: o.copyValue
    }));
  });

  const pickModelValue = computed({
    get() {
      return [cascaderValue.value];
    },
    set(v) {
      cascaderValue.value = v[0];
    }
  });

  const onConfirm = ({ selectedOptions }, hide) => {
    fieldValue.value = selectedOptions[0]?.label;
    cascaderValue.value = selectedOptions[0]?.copyValue;
    getMedicineLevelApi(selectedOptions[0]?.copyValue);
    hide();
  };

  const handleCancel = hide => {
    hide();
  };

  const chartData = ref({});

  async function getMedicineLevelApi(v) {
    let chartResult: any = {};
    try {
      if (isNotEmpty(v)) {
        chartResult = await getKeeMedicalUnderstandLadder({
          brandId: v
        });
        isShow.value = Object.keys(chartResult).some(k =>
          isNotEmpty(chartResult[k])
        );
      } else {
        isShow.value = false;
      }
      nextTick(() => {
        chartData.value = chartResult;
      });
    } catch (e) {
      isShow.value = false;
      throw e;
    }
  }

  const handleSearch = ({ name }) => {
    const _options = isNotEmpty(name)
      ? options.value.filter(item => item?.label?.includes(name))
      : JSON.parse(JSON.stringify(cacheOptions.value));
    options.value = _options;
    pickModelValue.value = [""];
  };

  return {
    fieldValue,
    options,
    fieldNames,
    extraConfig,
    echartsConfig,
    chartData,
    onConfirm,
    handleCancel,
    brandOptions,
    pickModelValue,
    isShow,
    handleSearch
  };
};

export const useMarketConcept = () => {
  const isShow = ref(true);
  const isOnSearch = ref(false);
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

  const selectedValue = ref("月观念");

  const chartData = ref<any>({});

  async function getMarketLevelApi() {
    //接口调用获取查询-医学理解梯度 观念结果统计折线图

    const chartResult =
      (await getConceptResultsStatisticsApi({
        brandId: searchFirstValue.value,
        familyId: searchSecondValue.value,
        indicationId: searchThirdValue.value,
        periodLength: selectedValue.value
      })) || {};

    const _isShow = Object.keys(chartResult).some(k => {
      return isNotEmpty(chartResult[k]);
    });
    //模拟
    isShow.value = _isShow;
    nextTick(() => {
      chartData.value = chartResult;
    });
  }

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

  watch(
    () => searchThirdValue.value,
    () => {
      nextTick(() => getMarketLevelApi());
    }
  );

  watch(
    () => selectedValue.value,
    (n, o) => {
      if (n !== o) {
        nextTick(() => {
          getMarketLevelApi();
        });
      }
    }
  );

  return {
    selectedValue,
    handleFinish,
    cascaderValue,
    options,
    fieldValue,
    fieldNames,
    searchFirstValue,
    searchSecondValue,
    searchThirdValue,
    defaultOption,
    handleChange,
    chartData,
    isShow,
    handleSearch
  };
};
