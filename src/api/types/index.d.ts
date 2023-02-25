import { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export interface ApiHandlerType {
  request: (request: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  response: <T, C = any>(response: Promise<AxiosResponse>, config?: AxiosRequestConfig & C) => Promise<T>;
}
