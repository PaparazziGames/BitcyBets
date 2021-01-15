import { combineReducers } from "redux";
import {authReducer, courseReducer, geoReducer} from "./entry";
import {balanceReducer} from "./game";
import {soundReducer} from "./sound";

export const rootReducer = combineReducers({
    authReducer,
    geoReducer,
    courseReducer,
    balanceReducer,
    soundReducer
})
