import { ref, watch, reactive, computed, nextTick } from "vue";
import {
  getKeeBrandList,
  getKeeArticlePublishItem,
  getKeeArticlePublishPage,
  getKeeClinicalTrialList
} from "@/api/kee360";
import { useToGetOptions } from "@/hooks/options-hook";
const customFieldName = {
  text: "label",
  value: "value",
  children: "children"
};
export const useScienceArticle = () => {
  const current = ref(1);
  const pageSize = ref(10);
  const total = ref(0);
  const isShow = ref(true);
  const fieldsText = reactive({
    brand: "",
    status: "",
    article: "期刊"
  });
  const pickModelValue = reactive({
    brand: [""],
    status: [""],
    article: ["期刊"]
  });
  const options = reactive<{
    brand: Array<{ label: string | number; value: string | number }>;
    status: Array<{ label: string | number; value: string | number }>;
    article: Array<{ label: string | number; value: string | number }>;
  }>({
    brand: [],
    status: [],
    article: [
      {
        label: "期刊",
        value: "期刊"
      },
      {
        label: "会议",
        value: "会议"
      }
    ]
  });

  const articleList = ref<Array<any>>([]);

  const onConfirm = ({ selectedOptions }, hide, type) => {
    fieldsText[type] = selectedOptions[0]?.label;
    resetParams();
    nextTick(() => {
      getScienceArticleApi();
    });
    hide();
  };
  const handleCancel = hide => {
    hide();
  };

  const resetParams = () => {
    current.value = 1;
  };

  const pages = computed(() => {
    return Math.ceil(total.value / pageSize.value);
  });
  async function getKeePublicItemApi() {
    const res: any = (await getKeeArticlePublishItem()) || {};
    const combineOptions = (res, key) =>
      res?.[key]?.map(i => ({ label: i, value: i })) || [];
    const brandOptions = combineOptions(res, "brands");
    const statusOptions = combineOptions(res, "status");
    options.brand = brandOptions || [];
    options.status = statusOptions || [];
    pickModelValue.brand = [brandOptions?.[0]?.value];
    pickModelValue.status = [statusOptions?.[0]?.value];
    fieldsText.brand = brandOptions?.[0]?.label;
    fieldsText.status = statusOptions?.[0]?.label;
    nextTick(() => {
      getScienceArticleApi();
    });
  }

  async function getScienceArticleApi() {
    const res: any =
      (await getKeeArticlePublishPage({
        brand: pickModelValue.brand[0],
        status: pickModelValue.status[0],
        type: pickModelValue.article[0] as any,
        orderTimeAsc: true,
        current: current.value,
        size: pageSize.value
      })) || [];

    isShow.value = res?.records?.length > 0;

    total.value = res?.total || 0;

    articleList.value =
      res?.records?.map(item => ({
        ...item,
        publicationType: item?.publicationType?.split(",")
      })) || [];
  }

  const handleRefecth = () => {
    nextTick(() => {
      getScienceArticleApi();
    });
  };
  getKeePublicItemApi();

  return {
    options,
    articleList,
    fieldsText,
    pickModelValue,
    onConfirm,
    handleCancel,
    customFieldName,
    isShow,
    current,
    total,
    pages,
    handleRefecth
  };
};

export const useScienceExperiment = () => {
  const isShow = ref(true);
  const current = ref(1);
  const pageSize = ref(10);
  const total = ref(0);
  const { cascaderValue, options, fieldValue, fieldNames } = useToGetOptions(
    "",
    async () => await getKeeBrandList(),
    false,
    v => {
      return Array.isArray(v) && v.length > 0
        ? [
            {
              label: v[0]?.label,
              value: v[0]?.value,
              children: null
            }
          ]
        : [];
    }
  );

  const experimentList = ref([]);

  const brandOptions = computed(() => {
    return options.value?.map(o => ({
      label: o.label,
      value: o.value,
      copyValue: o.copyValue
    }));
  });

  const pages = computed(() => {
    return Math.ceil(total.value / pageSize.value);
  });

  const resetParams = () => {
    current.value = 1;
  };

  const onConfirm = ({ selectedOptions }, hide) => {
    fieldValue.value = selectedOptions[0]?.label;
    resetParams();
    cascaderValue.value = selectedOptions[0]?.copyValue;
    hide();
  };

  const handleCancel = hide => {
    hide();
  };

  async function getScienceArticleApi(n) {
    const res = await getKeeClinicalTrialList({
      brand: n,
      size: pageSize.value,
      current: current.value
    });
    isShow.value = res?.records?.length > 0;

    total.value = res?.total || 0;

    experimentList.value =
      res?.records?.map(item => ({
        ...item,
        status: item?.status?.split(",")
      })) || [];
  }

  const handleRefecth = v => {
    nextTick(() => {
      getScienceArticleApi(v);
    });
  };

  watch(
    () => cascaderValue.value,
    (n, o) => {
      if (n !== o) {
        // 查询接口
        getScienceArticleApi(n);
      }
    }
  );

  return {
    fieldValue,
    fieldNames,
    onConfirm,
    handleCancel,
    cascaderValue,
    experimentList,
    brandOptions,
    isShow,
    total,
    current,
    pages,
    handleRefecth
  };
};
