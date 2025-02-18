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
      url: "/agriculture/info/list",
      method: "get",
    });
}