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
// 获取产量信息
export const getAllYieldInfoApi = () => {
  return request({
    url: "/analysis/agriculture/yieldInfoALl",
    method: "get",
  });
}
// 过去七天施肥情况
export const fertilizationLimit7Api = () => {
  return request({
    url: "/analysis/agriculture/fertilizationLimit7"
  })
}
// 过去七天施肥情况图表山上
export const fertilizationLimit7GraphApi = () => {
  return request({
    url: "/analysis/agriculture/fertilizationLimit7/graph"
  })
}