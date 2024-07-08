import { http } from "@/utils/http";

import { Response } from "./interface/result";

export const API_URL = {
  getNcepAuth: "/auth/ncepAuth", //获取token 及用户名
  getSelectList: "/product/getPersonaProductlist", //获取下拉列表选项
  //客户画像
  getAccessPotentialAndSupport: "/customerPortrait/accessPotentialAndSupport", //潜力支持度 查询
  getCustomerPortrait: "/customerPortrait/accessCustomerProfileOtherInfo", // 渠道、调研、覆盖等其他

  // 客户偏好
  /**
   * 1. 内容
   */
  getCustomerPreferencesFocusTop:
    "/customerPreferences/contentTagPreference/focusTop", //最常关注 3列
  getCustomerPreferencesTimelineList:
    "/customerPreferences/contentTagPreference/timePeriodList", //内容偏好时间段划分 热点图
  getCustomerPreferencesTimeline:
    "/customerPreferences/contentTagPreference/timePeriodTop", //常读时间段
  /**
   * 2.
   */
  // 参会偏好
  getCustomerEventPreference: "/customerPreferences/contentTagPreference/event",
  //客户观念
  getAccessLastAconceptResults: "/customerConcept/accessLastAconceptResults", //最近一次填写结果
  getConceptResultsStatistics: "/customerConcept/conceptResultsStatistics", //图标

  //朋友圈
  getBizHcpRelationship: "/friendCircle/bizHcpRelationship/list",
  // 埋点
  postLogAdd: "/operator/logs/add"
};

interface GetTokenParams {
  ncep_code: string | number;
  scene_code: string | number;
}
interface GetSelectListParams {
  dimType: string;
}

interface GetCustomerPortraitParams {
  brandId: string | number; //品牌
  familyId: string | number; //家族
  indicationId: string | number; //适应症
  [p: string]: any;
}

export function getNcepAuth(
  hcpId: string,
  params: GetTokenParams,
  extraConfig: any = {}
): Promise<Response> {
  return http.request({
    url: `${API_URL.getNcepAuth}/${hcpId}`,
    method: "get",
    params,
    ...extraConfig
  });
}
/**
 *
 * @param params
 * @returns
 */
export function getSelectList(params: GetSelectListParams): Promise<Response> {
  return http.request({
    url: `${API_URL.getSelectList}`,
    method: "get",
    params
  });
}
/**
 * 客户画像 潜力和支持度
 * @param params
 * 查询参数 品牌/家族/适应症
 * @returns
 */
export function getAccessPotentialAndSupport(
  params: GetCustomerPortraitParams
): Promise<Response> {
  return http.request({
    url: `${API_URL.getAccessPotentialAndSupport}`,
    method: "get",
    params
  });
}
/**
 * 客户画像 其他
 * @param params
 * @returns
 */
export function getCustomerPortrait(): Promise<Response> {
  return http.request({
    url: `${API_URL.getCustomerPortrait}`,
    method: "get"
  });
}
/**
 * 客户偏好/内容偏好 最常关注
 * @param params
 * @returns
 */
export function getCustomerPreferencesFocusTop(params: {
  readType: string;
}): Promise<Response> {
  return http.request({
    url: `${API_URL.getCustomerPreferencesFocusTop}`,
    method: "get",
    params
  });
}
/**
 * 客户偏好/内容偏好 时间段划分 热力图
 * @param params
 * @returns
 */
export function getCustomerPreferencesTimelineList(params: {
  readType: string;
}): Promise<Response> {
  return http.request({
    url: `${API_URL.getCustomerPreferencesTimelineList}`,
    method: "get",
    params
  });
}
/**
 * 客户偏好/内容偏好常读时间段
 * @param params
 * @returns
 */
export function getCustomerPreferencesTimeline(params: {
  readType: string;
}): Promise<Response> {
  return http.request({
    url: `${API_URL.getCustomerPreferencesTimeline}`,
    method: "get",
    params
  });
}
/**
 * 客户偏好 /参会偏好 整体接口响应
 * @param params
 * @returns
 */
export function getCustomerEventPreference(): Promise<Response> {
  return http.request({
    url: `${API_URL.getCustomerEventPreference}`,
    method: "get"
  });
}
/**
 * 客户观念 /最近一次填写结果列表
 * @param params
 * 路径{hcpCd}
 * @returns
 */
export function getAccessLastAconceptResults(
  params: GetCustomerPortraitParams
): Promise<Response> {
  return http.request({
    url: `${API_URL.getAccessLastAconceptResults}`,
    method: "get",
    params
  });
}
/**
 * 客户观念 / 图表区
 * @param params
 * 路径{hcpCd}
 * @returns
 */
export function getConceptResultsStatistics(
  params: GetCustomerPortraitParams
): Promise<Response> {
  return http.request({
    url: `${API_URL.getConceptResultsStatistics}`,
    method: "get",
    params
  });
}
/**
 * 学术合作 / 列表
 * @param params
 * @returns
 */
export function getBizHcpRelationship(params: {
  relationType?: "文章转发" | "共同参会" | "同台合作" | "全部";
}): Promise<Response> {
  return http.request({
    url: `${API_URL.getBizHcpRelationship}`,
    method: "get",
    params
  });
}
/**
 * 点击埋点
 * @param params
 * @returns
 */
export function postLogAdd(data: {
  behavior: string;
  [p: string]: any;
}): Promise<Response> {
  return http.request({
    url: `${API_URL.postLogAdd}`,
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
