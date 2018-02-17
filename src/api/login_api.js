import {axiosLoginInstance, restApiPost, restApiPostLogin} from "./api";
import {loginResponse, loginError} from "./interceptor/loginInterceptor";

const api_login = '/login';
const api_token = '/oauth/token';
const signup = '/users/register/add';
//=============================================================
//          THIS IS MAAIN METHOD OF API CALLING.
//=============================================================

axiosLoginInstance.interceptors.response.use(loginResponse,loginError);

export function loginRequest(data) {
    return restApiPostLogin(api_login, data);
}

export function generateAccessToken(data) {
    return restApiPost(api_token, data);
}

export function refreshAccessToken(data) {
    return restApiPost(api_token, data);
}

export function signUpRequest(data) {
    return restApiPostLogin(signup, data);
}