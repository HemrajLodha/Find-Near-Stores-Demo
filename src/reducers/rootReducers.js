import {combineReducers} from 'redux'
import locationsReducer from "./reducer/locationsReducer";

const rootReducer = combineReducers({
    locationsReducer,
});

export default rootReducer;

