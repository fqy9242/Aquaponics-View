import request from "@/utils/request";
// 获取采摘列表
export const harvestListApi = () => {
  return request({
    url: "/analysis/overview/harvestList",
    method: "get",
  });
};

// 农产品采摘优秀率TOP10
export const getPickingExcellenceRateTop10Api = () => {
  return request({
    url: "/analysis/agriculture/pickingExcellenceRateTop10",
    method: "get",
  });
}
// 获取种植任务总览信息
export const getPlantingTaskOverviewApi = (batchId) => {
  return request({
    url: `/analysis/agriculture/getPlantingTaskOverview/${batchId}`,
    method: "get",
  });
}