import { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ApiHandlerType } from "../types";


export default class CommonApiHandler implements ApiHandlerType {
    request(req: InternalAxiosRequestConfig){
        req.headers['Content-Type'] = 'application/json';
        req.headers['Pragma'] = 'no-cache';
        req.headers['Expires'] = '-1';
        req.headers['Accept'] = 'application/json';
        
        return req;
    }

    response<T, C = any>(res: Promise<AxiosResponse>, config?: AxiosRequestConfig & C): Promise<T> {
        return new Promise((resolve, reject) => {
            res
              .then(res => resolve(res.data))
              .catch((error) => {
                // alert(error);
                reject(error);
              });
          });
    }
}