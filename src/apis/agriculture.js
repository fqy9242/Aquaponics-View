import request from "@/utils/request";
// 获取采摘列表
export const harvestListApi = () => {
  return request({
    url: "/analysis/overview/harvestList",
    method: "get",
  });
};
