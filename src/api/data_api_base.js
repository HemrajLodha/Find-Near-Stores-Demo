import axios from "axios";
import qs from 'qs';
import {base_url, method_type_get, method_type_post} from "./api";
import {apiRequest, apiResponse, requestError, responseError} from "./interceptor/authorizedInterceptor";

export const axiosApiInstance = axios.create();
axiosApiInstance.interceptors.request.use(apiRequest, requestError);
axiosApiInstance.interceptors.response.use(apiResponse, responseError);
let CancelToken = axios.CancelToken;
let cancel;


export function restApiGet(url, data) {
    return axiosApiInstance.get(url, {
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        cancelToken: new CancelToken(function executor(c) {
            cancel = c;
        })
    });
}

export function restApiPostBearer(url, data) {
    return axiosApiInstance({
        baseURL: base_url,
        url: url,
        method: method_type_post,
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        cancelToken: new CancelToken(function executor(c) {
            cancel = c;
        })
    });
}

export function restApiPostWithMultipart(url, data) {
    return axiosApiInstance({
        baseURL: base_url,
        url: url,
        method: method_type_post,
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });
}

export function cancelRequest() {
    cancel();
}