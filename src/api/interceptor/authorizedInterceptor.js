import {SessionData} from "../../AsyncStorageKeys";
import {actionToLogin} from "../../App";

export async function apiRequest(config) {
    try {
        //config.headers.Authorization = 'Bearer ' + data.token.access_token;
        console.log('apiRequest', config);
        return config;
    } catch (err) {
        return Promise.resolve(err);
    }
}

export function requestError(error) {
    console.log('requestError', error);
    return Promise.reject(error);
}

export function apiResponse(response) {
    try {
        console.log('apiResponse', response.data);
        return Promise.resolve(response);
    } catch (err) {
        return Promise.reject(err);
    }
}

export function responseError(error) {
    console.log('ResponseError', JSON.stringify(error));
    return new Promise((resolve, reject) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401) {
            return reject("UnAuthorized");
        } else {
            return reject("Operation cancelled!");
        }
    });
}