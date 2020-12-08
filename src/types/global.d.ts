import { AxiosResponse } from 'axios';

declare global {
  interface SetUpResponse <T = any>{
    code: number;
    msg?: string;
    data: T;
  }

  interface MockResponseOptions <T = any> {
    query: Obj;
    data: Obj;
    method: string;
  }

  interface Obj<T = any>{
    [key: string]: T | any;
    [key: number]: T | any;
  }

  type HttpResponse<T> = AxiosResponse<SetUpResponse<T>>;
  type HttpResponseP<T> = Promise<HttpResponse<T>>;
}
