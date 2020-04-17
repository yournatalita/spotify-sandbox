import { AxiosRequestConfig } from 'axios';

export type IRequest = AxiosRequestConfig;

export type IResponse = AxiosResponse;

export type IReducerReturn = {
  type: string;
  payload: object;
};

