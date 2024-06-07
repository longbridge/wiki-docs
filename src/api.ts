import axios, { AxiosInstance, ResponseType } from "axios";

const defaultOptions = {
  timeout: 60 * 1000,
  responseType: "json" as ResponseType,
  withCredentials: true
};


const axiosInstance: AxiosInstance = axios.create(defaultOptions);
axiosInstance.interceptors.response.use(
  response => {
    const res = response.data;

    // code === 0 为正常返回
    if (res.code === 0) return res;

    // pong 为心跳接口请求，没有返回 code 字段只有 pong 字段，一般 pong 用于获取 header 信息
    if (res === "pong") return response;

    // 暴露原始 httpCode
    res.status = response.status;

    // 其它未知错误，原样返回
    return Promise.reject(res);
  },
  error => {
    return Promise.reject(error);
  }
);
export function post(url, params = {}) {
  return axiosInstance.request({
      url,
      method: "post",
      params
    }
  );
}
