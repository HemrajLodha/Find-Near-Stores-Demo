import * as types from './actionTypes';
import {} from "../data_api";
import {getLocationData} from "../data_api";

export function getData() {
    return {
        type: types.SENDING_DATA
    }
}

export function getDataSuccess(data) {
    if (!data || data.length === 0) {
        return getDataFailure(false, "no data found");
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

export function getLocations(data) {
    return (dispatch) => {
        dispatch(getData());
        getLocationData(data)
            .then((res) => {
                dispatch(getDataSuccess(res.data));
            })
            .catch((error) => dispatch(getDataFailure(false, error)))
    };
}