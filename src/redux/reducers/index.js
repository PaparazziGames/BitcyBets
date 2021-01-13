import { combineReducers } from "redux";
import {authReducer, balanceReducer, courseReducer, geoReducer} from "./entry";

export const rootReducer = combineReducers({
    authReducer,
    geoReducer,
    courseReducer,
    balanceReducer
})
