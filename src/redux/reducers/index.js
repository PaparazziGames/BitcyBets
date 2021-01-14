import { combineReducers } from "redux";
import {authReducer, courseReducer, geoReducer} from "./entry";
import {balanceReducer} from "./game";

export const rootReducer = combineReducers({
    authReducer,
    geoReducer,
    courseReducer,
    balanceReducer
})
