import * as types from './actionTypes';
import {} from "../data_api";
import {getRoutesData} from "../data_api";

export function getData() {
    return {
        type: types.SENDING_DATA
    }
}

export function getDataSuccess(data) {
    if (!data) {
        return getDataFailure(false, "no route found");
    }
    return {
        type: types.DATA_SUCCESS,
        data: data,
        status: true,
        message: "data by location",
    }
}

export function getDataFailure(status, message) {
    return {
        type: types.DATA_FAILURE,
        status: status,
        message: message,
        data: {}
    }
}

export function getRoutes(data) {
    return (dispatch) => {
        dispatch(getData());
        getRoutesData(data)
            .then((res) => {
                dispatch(getDataSuccess(res.data));
            })
            .catch((error) => dispatch(getDataFailure(false, error)))
    };
}