import { ref, watch, unref, Ref, reactive, nextTick } from "vue";
import { getAccessPotentialAndSupport } from "@/api/index";
import {
  getKeeBrandList,
  getKeeSpeakerLevel,
  getkeeComprehenstionStage
} from "@/api/kee360";
import { useToGetOptions } from "@/hooks/options-hook";
import { isNotEmpty } from "@/utils/util";
export const useKeeCustomerProfile = () => {
  const activeName = ref(["KEE画像"]);

  const isOnSearch = ref(false);
  const isOnGradientSearch = ref(false);
  const {
    cascaderValue,
    options,
    fieldNames,
    fieldValue,
    searchFirstValue,
    searchSecondValue,
    searchThirdValue,
    defaultOption,
    cacheOptions
  } = useToGetOptions("persona");

  const {
    cascaderValue: gradientModel,
    fieldValue: gradientFieldValue,
    options: gradientOptions,
    searchFirstValue: gradientSearchFirstValue,
    searchSecondValue: gradientSearchSecondValue,
    defaultOption: gradientDefaultOption,
    cacheOptions: gradientCacheOptions
  } = useToGetOptions(
    "",
    async () => await getKeeBrandList(),
    false,
    ({ values }) => {
      Object.assign(gradientParams, {
        brandId: values?.[0],
        indicationId: values?.[1]
      });
    }
  );

  const showPopover = ref(false);

  const potential = ref("");

  const keeLevel: Ref<string | number> = ref("");
  const speakerLevel: Ref<string | number> = ref("");
  const gradientResult: Ref<string | number> = ref("");
  const gradientParams = reactive({
    brandId: "",
    indicationId: ""
  });

  const handleSearch = ({ name, isSearch }) => {
    const _options = isNotEmpty(name)
      ? cacheOptions.value.filter(item => item?.label?.includes(name))
      : JSON.parse(JSON.stringify(cacheOptions.value));
    options.value = _options;
    isOnSearch.value = isSearch;
    cascaderValue.value = "";
  };
  const handleGradientSearch = ({ name, isSearch }) => {
    const _options = isNotEmpty(name)
      ? gradientCacheOptions.value.filter(item => item?.label?.includes(name))
      : JSON.parse(JSON.stringify(gradientCacheOptions.value));
    gradientOptions.value = _options;
    isOnGradientSearch.value = isSearch;
    gradientModel.value = "";
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

  const handleGradientChange = ({ deepValue, combineValue }) => {
    gradientModel.value = "";
    nextTick(() => {
      gradientDefaultOption.value = combineValue;
      gradientModel.value = deepValue;
      const fieldValueText = combineValue.map(option => option.label).join("-");
      gradientFieldValue.value = fieldValueText;
      gradientSearchFirstValue.value = combineValue[0]?.copyValue || "";
      if (combineValue?.length === 2) {
        gradientSearchSecondValue.value = combineValue[1]?.copyValue || "";
        Object.assign(gradientParams, {
          brandId: combineValue[0]?.copyValue || "",
          indicationId: combineValue[1]?.copyValue || ""
        });
      }
    });
  };
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

  const handleGradientFinish = ({ selectedOptions }) => {
    const selectValues = selectedOptions.map(s => s.copyValue);
    gradientFieldValue.value = selectedOptions
      .map(option => option.label)
      .join("-");
    gradientParams.brandId = selectValues?.[0];
    gradientParams.indicationId = selectValues?.[1];
  };

  //获取客户画像 潜力和支持度
  async function getAccessPotentialAndSupportApi(value) {
    const res = await getAccessPotentialAndSupport({
      brandId: searchFirstValue.value,
      familyId: searchSecondValue.value,
      indicationId: value
    });
    potential.value = res.potential;
  }

  async function getKeeComprehenstionStageAPi(params: any = {}) {
    if (isNotEmpty(params.brandId) && isNotEmpty(params.indicationId)) {
      const res = await getkeeComprehenstionStage(params);
      gradientResult.value = res?.result;
    }
  }

  async function initPage() {
    const [speakerLevelResult] = await Promise.all([
      getKeeSpeakerLevel(),
      getKeeComprehenstionStageAPi(gradientParams)
    ]);
    keeLevel.value = speakerLevelResult.keeLevel;
    speakerLevel.value = speakerLevelResult.speakerLevel;
  }

  initPage();

  watch(
    () => searchThirdValue,
    v => {
      getAccessPotentialAndSupportApi(unref(v));
    },
    {
      deep: true
    }
  );
  watch(
    () => gradientParams,
    v => {
      getKeeComprehenstionStageAPi(v);
    },
    { deep: true }
  );
  return {
    activeName,
    fieldValue,
    cascaderValue,
    options,
    fieldNames,
    handleFinish,
    handleChange,
    defaultOption,
    gradientOptions,
    handleGradientFinish,
    keeLevel,
    speakerLevel,
    gradientResult,
    gradientModel,
    potential,
    showPopover,
    gradientFieldValue,
    gradientSearchFirstValue,
    gradientSearchSecondValue,
    gradientDefaultOption,
    handleGradientChange,
    handleSearch,
    handleGradientSearch
  };
};
