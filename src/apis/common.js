import axios from "axios"
// 开启警告灯
export const startWarningLightApi = () => {
    console.log("startWarningLightApi");
    return axios({
        url: "http://10.0.19.1:18081/alert/startAlert",
        method: "get",
    });
}
// 关闭警告灯
export const endWarningLightApi = () => {
    return axios({
        url: "http://10.0.19.1:18081/alert/endAlert",
        method: "get",
    });
}