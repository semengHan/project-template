import { set, get, isString, isObject, isFunction } from "lodash";
import { message } from "antd";
import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

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

interface PendingType {
  url?: string;
  method?: Method;
  params: any;
  data: any;
  cancel: (t: any) => void;
}

const { CancelToken } = axios;

const codeMessage = {
  200: "服务器成功返回请求的数据。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（登录缓存超过最大时长，需要重新登录）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  504: "网关超时。",
};

let messageTip: any = null;

// axios 实例
const instance = axios.create({
  timeout: 1000 * 60 * 6,
  responseType: "json",
  baseURL: "/api", // TODO dev
});

// 请求列表，取消重复请求
const pendings: Array<PendingType> = [];

/**
 * 当前请求在数组中存在时, 移除重复请求
 * @param config
 */
const removePending = (config: RequestConfig) => {
  pendings.forEach((pending: PendingType, index: number) => {
    // 当前请求在数组中存在时执行函数体
    if (
      pending.url === config.url &&
      pending.method === config.method &&
      JSON.stringify(pending.params) === JSON.stringify(config.params) &&
      JSON.stringify(pending.data) === JSON.stringify(config.data)
    ) {
      // 执行取消操作
      pending.cancel("操作太频繁，请稍后再试");
      pendings.splice(index, 1);
    }
  });
};

/**
 * 请求拦截
 * @param config
 */
const requestSuccess = (config: RequestConfig): RequestConfig => {
  removePending(config);
  // 加入请求队列
  const newConfig = { ...config };
  newConfig.cancelToken = new CancelToken((c) => {
    pendings.push({
      url: config.url,
      method: config.method as Method,
      params: config.params,
      data: config.data,
      cancel: c,
    });
  });

  const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjNmMzUzZTk1LTMxZmQtNGEwNi1iM2Q5LTk2NjY5YTEyYmJiOSJ9.c5Eh3VY0R3Neb7LkDZJA4gJOh0U-mJQXlzuCy4gEyqDbVaL5SpOjYBNVoYmurDZpz2XUqy7c4uwftkE2HhOe3A";
  if (token) {
    set(newConfig, "headers.Authorization", `Bearer ${token}`);
  }

  return newConfig;
};

const requestFail = (error: any) => Promise.reject(error);

/**
 * 响应拦截
 * @param response
 */
const responseSuccess = (
  response: AxiosResponse
): AxiosResponse | Promise<AxiosResponse> => {
  removePending(response.config as RequestConfig);

  const { messageConfig } = response.config as RequestConfig;

  if (response.status === 200) {
    if (response.config.responseType === "blob") {
      // 返回数据流
      return response;
    } // 返回json
    const { data } = response;

    // 默认需要提示，如果没有配置走默认提示逻辑
    const showTip = get(messageConfig, "show", true);
    const textFunc = get(messageConfig, "text", false);

    // 如果是无权限，直接弹窗，无需其他逻辑处理
    if ([402, 403].includes(data.code)) {
      // window.location.reload();
      return data;
    }

    if (data.code === 401) {
      const omg = data.data || data.msg || "权限异常或者无权限访问！";
      message.error(omg?.msg ? omg.msg : omg);
      return data;
    }

    if (showTip) {
      if (isFunction(textFunc)) {
        textFunc(data);
      } else if (isObject(textFunc)) {
        const msg =
          textFunc[data.code] ||
          textFunc["*"] ||
          data.data ||
          data.msg ||
          codeMessage[data.code];
        if (data.code !== 200 && data.code !== 0 && data.code !== 404) {
          if (data.code === 400) {
            const m =
              textFunc[data.code] ||
              data.data ||
              data.msg ||
              codeMessage[data.code];
            message.error(m?.msg ? m.msg : m);
          } else {
            message.error(msg?.msg ? msg.msg : msg);
          }
        } else if (data.code === 404 && "404" in textFunc) {
          // 如果提示信息配置为一个对象，并且其中包含 404 的状态，那么也需要提示（但是因为 404 是个特殊的状态，并不代表没有，有些情况下
          // 仅仅代表无数据；提示信息优先级按照配置，接口提示，全局提示）
          message.warning(msg?.msg ? msg.msg : msg);
        } else if (data.code === 200 && "200" in textFunc) {
          // 如果提示信息配置为一个对象，并且其中包含 200 成功的状态，那么当操作成功时也需要提示（优先级按照配置，接口提示，全局提示）
          message.success(msg?.msg ? msg.msg : msg);
        } else {
          console.log("[TIP CONFIG]: is not exit", messageConfig);
        }
      } else if (isString(textFunc)) {
        // 一般如果提示信息仅为字符串时说明不需要处理常规请求，只需要处理异常情况
        if (data.code !== 200 && data.code !== 0 && data.code !== 404) {
          message.error(textFunc);
        }
      } else if (data.code !== 200 && data.code !== 0 && data.code !== 404) {
        const msg = data.data || data.msg || codeMessage[data.code];
        message.error(msg?.msg ? msg.msg : msg);
      }
    }

    return data;
  }
  return Promise.reject(response);
};

const responseFail = (error: any) => {
  // console.log('responseFail', error);

  const json = error.toJSON ? error.toJSON() : error;
  const { response } = error;
  if (json.code === undefined && json.message === "Network Error") {
    if (!messageTip) {
      messageTip = message.error("网络断开或是服务器异常!", 2.5, () => {
        messageTip = null;
      });
    }
  } else {
    // 根据返回的http状态码做不同的处理
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
  }

  // 超时重新请求
  const { config } = error;
  // 全局的请求次数, 请求的间隙
  const [RETRY_COUNT, RETRY_DELAY] = [0, 1000];
  if (config && RETRY_COUNT) {
    // 设置用于跟踪重试计数的变量
    config.retryCount = config.retryCount || 0;
    // 检查是否已经把重试的总数用完
    if (config.retryCount >= RETRY_COUNT) {
      return Promise.reject(response || { message: error.message });
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

  return Promise.reject(response || { message: error.message });
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
instance.interceptors.request.use(requestSuccess, requestFail);
instance.interceptors.response.use(responseSuccess, responseFail);

export interface IBaseRes {
  code: number;
  data: any;
  msg: string;
}

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

export interface IStatus extends IBaseRes {
  data: string;
}

export default instance;
