import request from "@/utils/request";
// 获取设备概览信息
export const getDeviceInfoApi = () => {
    return request({
      url: "/analysis/overview/deviceInfo",
      method: "get"
    });
}

// 获取设备预警信息
export const getDeviceWarningApi = () => {
    return request({
      url: "/analysis/overview/deviceWarningInfo",
      method: "get",
    });
}
// 获取种植面积，养殖面积，以及年同比
export const agriculturalAreaSummaryThisYearApi = () => {
  return request({
    url: "/analysis/overview/agriculturalAreaSummaryThisYear",
  });
}
// 获取种植地块，养殖鱼棚地理分布热力值
export const getLandGeoHeatmapApi = () => {
  return request({
    url: "/analysis/overview/landGeoHeatmap",
  });
};


// 获取养殖鱼棚，养殖鱼棚地理分布热力值
export const getFishPastureGeoHeatApi = () => {
  return request({
    url: "/analysis/overview/fishPastureGeoHeatmap",
  });
};
// 获取总览词云
export const getWordCloudApi = () => {
  return request({
    url: "/analysis/overview/wordCloud",
  });
}

// 获取鱼菜共生基地分布信息
export const getBaseInfoApi = () => {
  return request({
    url: "/analysis/overview/baseInfo",
  });
}