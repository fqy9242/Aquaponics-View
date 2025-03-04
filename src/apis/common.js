import axios from "axios"
import config from '@/../config.json'
const deviceHost = config.OperationWarningLightApiHost; // 从'@/../config.json'中获取
// 开启警告灯
export const startWarningLightApi = () => {
  console.log("startWarningLightApi");
  return axios({
    url: `http://${deviceHost}/alert/startAlert`,
    method: "get",
  });
}
// 关闭警告灯
export const endWarningLightApi = () => {
    return axios({
      url: `http://${deviceHost}/alert/endAlert`,
      method: "get",
    });
}
