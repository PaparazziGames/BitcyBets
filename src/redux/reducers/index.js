import { combineReducers } from "redux";
import {authReducer, courseReducer, geoReducer} from "./entry";

export const rootReducer = combineReducers({
    authReducer,
    geoReducer,
    courseReducer
})
