// import Cookies from 'js-cookie';
import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

interface PendingType {
  url?: string;
  method?: Method;
  params: any;
  data: any;
  cancel: (t: any) => void;
}

type RequestConfig = AxiosRequestConfig & {
  messageConfig?: {
    show: boolean;
    text?:
      | string
      | JSX.Element
      | {
          [key: number | string]: string | JSX.Element;
        }
      | ((data: any) => void);
  };
  cache?: any;
};

const { CancelToken } = axios;
// window.BASE_API = '/'; // 可写在index.html中
const TIMEOUT = 1000 * 60 * 6;
// 全局的请求次数, 请求的间隙
const [RETRY_COUNT, RETRY_DELAY] = [0, 100];

// type PositiveInteger<T extends number> = T extends 0 ? never : number;
// let a: PositiveInteger<0> = 0;
// a = -3;
// console.log(a);

function messageAlert(msg: string) {
  console.log(msg);
}

function showLoading() {
  console.log("show loading ...");
}

function hideLoading() {
  console.log("hide loading");
}

// http 状态码
const codeMessage = {
  200: "服务器成功返回请求的数据。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  504: "网关超时。",
};

// 当前请求在数组中存在时, 移除重复请求
// 请求列表，取消重复请求
const pendings: Array<PendingType> = [];
const reqDebounce = (config) => {
  pendings.forEach((pending, index) => {
    // 当前请求在数组中存在时执行函数体
    if (
      pending.url === config.url &&
      pending.method === config.method &&
      JSON.stringify(pending.params) === JSON.stringify(config.params) &&
      JSON.stringify(pending.data) === JSON.stringify(config.data)
    ) {
      // 执行取消操作
      pending.cancel(`操作太频繁，请稍后再试。${pending.url}`);
      pendings.splice(index, 1);
    }
  });
};

let reqNum = 0; // 未完成的请求数
let TIMER = null;
const requestSuccess = (config: RequestConfig) => {
  reqDebounce(config);

  if (config.hasLoading) {
    ++reqNum;
    showLoading();

    if (TIMER) clearTimeout(TIMER);
    // TIMEOUT + 1s 后强制关闭loading
    TIMER = setTimeout(() => {
      hideLoading();
    }, TIMEOUT + 1000);
  }

  // 加入请求队列
  const newConfig = { ...config };
  newConfig.cancelToken = new CancelToken((c) => {
    pendings.push({
      url: config.url,
      method: config.method,
      params: config.params,
      data: config.data,
      cancel: c,
    });
  });

  // const token = Cookies.get(tokenKey);
  // if (token) {
  //   newConfig.headers.Authorization = `Bearer ${token}`;
  // }

  return newConfig;
};

const requestFail = (error: any) => Promise.reject(error);

const responseSuccess = (
  response: AxiosResponse
): AxiosResponse | Promise<AxiosResponse> => {
  reqDebounce(response.config);
  if (response.config.hasLoading) --reqNum;
  if (reqNum < 1) hideLoading();

  if (response.status === 200) {
    // 返回数据流
    if (response.config.responseType === "blob") {
      return response;
    }
    const { data } = response;
    if (data.code === 401) {
      const omg = data.data || data.msg || "权限异常或者无权限访问！";
      messageAlert(omg?.msg ? omg.msg : omg);
    }
    // if ([402, 403, 404].includes(data.code)) {
    //   window.location.reload()
    //   return data
    // }

    return data;
  }
  return response;
};

const responseFail = (error: any) => {
  reqDebounce(error.response.config);
  if (error.config && error.config.hasLoading) --reqNum;
  if (reqNum < 1) hideLoading();

  const json = error.toJSON ? error.toJSON() : error;
  const { response } = error;
  // 根据返回的http状态码做不同的处理
  if (response.status === 404) {
    window.location.reload();
  }
  if (json.code === undefined && json.message === "Network Error") {
    messageAlert("网络断开或是服务器异常!");
  } else {
    switch (response?.status) {
      case 401:
        // token失效
        break;
      case 403:
        // 没有权限
        break;
      case 500:
        // 服务端错误
        break;
      case 503:
        // 服务端错误
        break;
      default:
        break;
    }

    const msg = response.status ? codeMessage[response.status] : "";
    msg && messageAlert(msg);
  }

  // 超时重新请求
  const { config } = error;
  if (config && RETRY_COUNT > 0) {
    // 设置用于跟踪重试计数的变量
    config.retryCount = config.retryCount || 0;
    // 检查是否已经把重试的总数用完
    if (config.retryCount >= RETRY_COUNT) {
      return response || { message: error.message };
      // return Promise.reject(response || { message: error.message });
    }
    // 增加重试计数
    config.retryCount += 1;
    // 创造新的Promise来处理指数后退
    const backoff = new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, RETRY_DELAY || 1);
    });
    // instance重试请求的Promise
    return backoff.then(() => instance(config));
  }

  return response || { message: error.message };
  // return Promise.reject(response || { message: error.message });
};

// axios 实例
const instance = axios.create({
  timeout: TIMEOUT,
  responseType: "json",
  baseURL: window.BASE_API,
});
instance.interceptors.request.use(requestSuccess, requestFail);
instance.interceptors.response.use(responseSuccess, responseFail);

export const GET = <T = any>(
  url: string,
  params?: any,
  config?: RequestConfig
): Promise<T> => instance.get(url, { params, ...config });

export const POST = <T = any>(
  url: string,
  data?: any,
  config?: RequestConfig
): Promise<T> => instance.post(url, data, config);

export const PUT = <T = any>(
  url: string,
  data?: any,
  config?: RequestConfig
): Promise<T> => instance.put(url, data, config);

export const DELETE = <T = any>(
  url: string,
  params?: any,
  config?: RequestConfig
): Promise<T> => instance.delete(url, { params, ...config });

export const REQUEST = <T = any>(config: RequestConfig): Promise<T> =>
  instance.request(config);

export default instance;
