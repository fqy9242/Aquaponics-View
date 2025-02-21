import request from "@/utils/request";
// 捕捞
export const listFishingRecordApi = () => {
    return request({
        url: "/analysis/fish/listFishingRecord",
        method: "get",
    });
}