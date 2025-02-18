import axios from "axios";
import router from "@/router";
// axios的基础封装
const httpInstance = axios.create({
    baseURL: '/api',
    timeout: 5000
})


// axios响应拦截器
httpInstance.interceptors.response.use(res => {
  return res.data;
    
}, e => {
      ElMessage.warning("请求错误！");
      return Promise.reject(e);
})




export default httpInstance