import {combineReducers} from 'redux'
import locationsReducer from "./reducer/locationsReducer";
import routesReducer from "./reducer/routesReducer";

const rootReducer = combineReducers({
    locationsReducer,
    routesReducer
});

export default rootReducer;

