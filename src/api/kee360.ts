import { http } from "@/utils/http";

import { Response } from "./interface/result";

const API_URL = {
  //Kee画像
  getKeeBrandList: "/brandIndications/list", //品牌适应症列表查询
  getKeeSpeakerLevel: "/keeportrait/keeSpeakerLevel", //KEE画像-kee和讲着级别查询
  getkeeComprehenstionStage: "/keeportrait/comprehenstionStage", //KEE画像-理解度阶梯结果查询

  //KEE 医学理解梯度
  getKeeMedicalUnderstandLadder:
    "/medicalUnderstandLadder/comprehenstionStageTrend", // KEE观念-医学理解度阶梯查询
  getKeeMedicalUnderstandLadderLastResult:
    "/medicalUnderstandLadder/lastResult", // KEE观念-医学理解度阶梯-最近一次观念结果填写列表查询

  // 科研动态 文章发表

  getKeeArticlePublishItem: "/scientificResearch/articlePublishItem", // 科研动态-文章发表-文章发表下拉选项查询
  getKeeArticlePublishPage: "/scientificResearch/articlePublishPage", // 科研动态-文章发表-列表数据

  // 科研动态 临时实验列表
  // 品牌列表 取适应症一级数据展示
  getKeeClinicalTrialList: "/scientificResearch/clinicalTrialList",

  // 跨团队覆盖-选项接口查询
  getKeeCrossTeamCoverageOptions: "/crossTeamCoverage/selectItem",
  // 跨团队覆盖-卡片列表查询
  getKeeCrossTeamCoverageCardList: "/crossTeamCoverage/queryData"
};

interface GetkeeComprehenstionStageParams {
  brandId: string | number; //品牌
  indicationId: string | number; //适应症
  [p: string]: any;
}
interface GetKeeArticlePublishPageParams {
  brand?: string | number; //品牌
  status?: string | number; //状态
  type?: "期刊" | "会议"; //类型
  current?: number; //当前页
  size?: number; //每页条数
  [p: string]: any;
}

interface GetKeeCrossTeamCoverageOptionsParams {
  item: "team" | "product" | "time_period";
  productId: any;
  teamId: any;
  timePeriodId: any;
}

// 品牌适应症列表 二级联动
export function getKeeBrandList(): Promise<Response> {
  return http.request({
    url: API_URL.getKeeBrandList,
    method: "get"
  });
}
export function getKeeSpeakerLevel(): Promise<Response> {
  return http.request({
    url: API_URL.getKeeSpeakerLevel,
    method: "get"
  });
}

/**
 * 理解阶梯梯度结果查询
 * @param params { brand_id: string | indication_id}
 * @return result
 */
export function getkeeComprehenstionStage(
  params: GetkeeComprehenstionStageParams
): Promise<Response> {
  return http.request({
    url: API_URL.getkeeComprehenstionStage,
    method: "get",
    params
  });
}

/**
 * 医学理解梯度 折线图查询
 * @param params { brandId }
 * @returns 折线图所需数据
 */
export function getKeeMedicalUnderstandLadder(
  params: Partial<GetkeeComprehenstionStageParams>
): Promise<Response> {
  return http.request({
    url: API_URL.getKeeMedicalUnderstandLadder,
    method: "get",
    params
  });
}
/**
 * 医学理解梯度 最后一次填写结果 品牌展示一级  二级展示适应症 列表下拉框分开显示
 * @param params {brandId	| indicationId}
 * @return
 */
export function getKeeMedicalUnderstandLadderLastResult(
  params: GetkeeComprehenstionStageParams
): Promise<Response> {
  return http.request({
    url: API_URL.getKeeMedicalUnderstandLadderLastResult,
    method: "get",
    params
  });
}
/**
 * 科研动态 文章发表 下拉选项
 * @param params
 * @return { brands | status}
 */
export function getKeeArticlePublishItem(): Promise<Response> {
  return http.request({
    url: API_URL.getKeeArticlePublishItem,
    method: "get"
  });
}
/**
 * 科研动态 文章发表 下拉选项
 * @param params
 * @return { brands | status}
 */
export function getKeeArticlePublishPage(
  params: GetKeeArticlePublishPageParams
): Promise<Response> {
  return http.request({
    url: API_URL.getKeeArticlePublishPage,
    method: "get",
    params
  });
}
/**
 * 科研动态 文章发表 下拉选项
 * @param params
 * @return { brands | status}
 */
export function getKeeClinicalTrialList(
  params: GetKeeArticlePublishPageParams
): Promise<Response> {
  return http.request({
    url: API_URL.getKeeClinicalTrialList,
    method: "get",
    params
  });
}
/**
 * 跨团队覆盖 下拉选项
 * @param params
 * @return Array<{item选项	itemId 值 }>
 */
export function getKeeCrossTeamCoverageOptions(
  params: GetKeeCrossTeamCoverageOptionsParams
): Promise<Response> {
  return http.request({
    url: API_URL.getKeeCrossTeamCoverageOptions,
    method: "get",
    params
  });
}
/**
 * 跨团队覆盖 卡片列表
 * @param params
 * @return Array<{item选项	itemId 值 }>
 */
export function getKeeCrossTeamCoverageCardList(params: {
  productId: any;
  teamId: any;
  timePeriodId: any;
}): Promise<Response> {
  return http.request({
    url: API_URL.getKeeCrossTeamCoverageCardList,
    method: "get",
    params
  });
}
