/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import Axios, {
  AxiosInstance, AxiosRequestConfig, AxiosResponse,
} from 'axios';
import Qs from 'qs';

function requestInterceptor(config: AxiosRequestConfig) {
  config.headers['Content-Type'] = 'application/json;charset=UTF-8';

  config.headers.token = '0a71a953-c190-44b8-9dab-870a36c67134';

  return config;
}

interface Target{
  [key: string]: any;
}

function checkStatus(status: number) {
  let errorInfo = '';
  switch (status) {
    case -1:
      errorInfo = '远程服务器响应失败，请稍后再试';
      break;
    case 400:
      errorInfo = '400：错误请求';
      break;
    case 401:
      errorInfo = '401：访问的令牌无效或已过期';
      break;
    case 403:
      errorInfo = '403：拒绝访问';
      break;
    case 404:
      errorInfo = '404：资源不存在';
      break;
    case 405:
      errorInfo = '405：请求方法未允许';
      break;
    case 408:
      errorInfo = '408：请求超时';
      break;
    case 500:
      errorInfo = '500：访问服务器失败';
      break;
    case 501:
      errorInfo = '501: 未实现';
      break;
    case 502:
      errorInfo = '502：无效网关';
      break;
    case 503:
      errorInfo = '503：服务不可用';
      break;
    default:
      errorInfo = `连接错误${status}`;
      break;
  }
  return {
    status,
    msg: errorInfo,
  };
}

function responseInterceptor(response: AxiosResponse) {
  if (response) {
    const status = response.status || -1000;
    if ((status >= 200 && status < 300) || status === 304) {
      return response.data;
    }
    return checkStatus(status);
  }
  return {
    code: -404,
    msg: '网络异常',
  };
}

function responseInterceptors<T>(Target: Target, name: string) {
  (Target[name] as AxiosInstance).interceptors
    .response
    .use(responseInterceptor, (error) => checkStatus(error.status));
}

function requestInterceptors(Target: Target, name: string) {
  (Target[name] as AxiosInstance).interceptors
    .request
    .use(requestInterceptor, (error) => Promise.reject(error));
}

class Http {
  @requestInterceptors
  @responseInterceptors
  private static http: AxiosInstance = Axios.create({
    baseURL: 'https://www.zswindfly.top/x3',
    timeout: 10000,
  });

  static get<T = any, R = SetUpResponse<T>>(url: string, params: any): Promise<R> {
    return this.http
      .get(url, { params });
  }

  static post<T = any, R = SetUpResponse<T>>(url: string, data: any): Promise<R> {
    return this.http
      .post(url, data);
  }

  static postFile<T = any, R = SetUpResponse<T>>(url: string, data: any): Promise<R> {
    return this.http
      .post(url, Qs.stringify(data), {
        headers: {
          ContentType: 'application/x-www-form-urlencoded',
        },
      });
  }

  static put<T = any, R = SetUpResponse<T>>(url: string, data: any): Promise<R> {
    return this.http
      .put(url, data);
  }

  static delete<T = any, R = SetUpResponse<T>>(url: string, params: any): Promise<R> {
    return this.http
      .delete(url, { params });
  }
}

export const http = Http;
