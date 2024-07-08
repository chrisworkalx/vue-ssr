import { ref, reactive, onMounted, onBeforeUnmount, isRef } from "vue";
export function isJSON(str) {
  if (typeof str == "string") {
    try {
      var obj = JSON.parse(str);
      if (str.indexOf("{") > -1) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  return false;
}
export function useCommonWorker(CstWorker) {
  const worker = ref(null);
  const result = reactive({
    init: {},
    change: {}
  });

  const startWorker = data => {
    if (isJSON(data)) {
      data = JSON.parse(data);
    }
    if (worker.value) {
      // console.log("created-----startWorker---");
      worker.value.postMessage(data);
    }
  };

  onMounted(() => {
    if (window.Worker) {
      worker.value = new CstWorker();

      worker.value.onmessage = e => {
        const { type, originData } = e.data;
        result[type] = originData;
      };
    } else {
      console.log("Your browser doesn't support web workers.");
    }
  });

  onBeforeUnmount(() => {
    if (worker.value) {
      worker.value.terminate();
      worker.value = null;
    }
  });

  return {
    result,
    startWorker
  };
}
