import * as types from '../../api/routes/actionTypes';
import initialState from '../../api/routes/initialState';

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SENDING_DATA:
            return {
                ...state,
                data: {},
                isLoading: true
            };
        case types.DATA_SUCCESS:
        case types.DATA_FAILURE:
            return {
                ...state,
                isLoading: false,
                data: action.data,
                message: action.message,
                status: action.status,
            };
        default:
            return state;
    }
}