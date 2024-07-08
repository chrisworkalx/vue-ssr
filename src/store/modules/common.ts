import { defineStore } from "pinia";
import { store } from "@/store";

export const useCommonStore = defineStore({
  id: "common",
  state: () => ({
    potential: ""
  }),
  actions: {
    setPotential(v) {
      this.potential = v;
    }
  }
});

export function useCommonHook() {
  return useCommonStore(store);
}
