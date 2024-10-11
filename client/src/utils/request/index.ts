// 二次封装axios，统一处理请求
import axios from "axios"; 
const request = axios.create({
baseURL: "http://localhost:3000/api",
   // baseURL: "http://47.108.183.218:3000/api",

  // 这里因该不写死
  timeout: 5000,
});
request.interceptors.request.use((config) => {
    return config

})

request.interceptors.response.use((response) => {
    return response
}, (error) => {
    
})
export default request