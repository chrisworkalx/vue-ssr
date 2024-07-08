import { watch, onBeforeUnmount } from "vue";
import { postLogAdd } from "@/api";

export const useWatchLogPoint = refKey => {
  const unWatch = watch(
    refKey,
    (v: any) => {
      postLogAdd({
        behavior: v
      });
    },
    { flush: "post" }
  );

  onBeforeUnmount(() => {
    // 组件卸载前，清除监听
    unWatch();
  });
};
