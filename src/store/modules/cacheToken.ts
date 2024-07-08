import { defineStore } from "pinia";
import { store } from "@/store";
import { getNcepAuth } from "@/api";

export const useCacheTokenStore = defineStore({
  id: "cache-token",
  state: () => ({
    token: sessionStorage.getItem("X-Access-Token") || "",
    ncepCode: "",
    userName: sessionStorage.getItem("userName") || ""
  }),
  actions: {
    async setToken({ hcp_code, ncep_code, scene_code }) {
      const res = await getNcepAuth(hcp_code, {
        ncep_code,
        scene_code
      });
      sessionStorage.setItem("X-Access-Token", res?.token);
      sessionStorage.setItem("userName", res?.userName);
      this.token = res?.token;
      this.ncepCode = ncep_code;
      this.userName = res?.userName;
      return Promise.resolve();
    },
    resetToken() {
      sessionStorage.removeItem("X-Access-Token");
      sessionStorage.removeItem("userName");
      this.token = "";
      this.ncepCode = "";
      this.userName = "";
      //需要和小程序端沟通 重新进入 获取code刷新页面
    }
  }
});

export function useCacheTokenHook() {
  return useCacheTokenStore(store);
}
