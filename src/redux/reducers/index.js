import { combineReducers } from "redux";
import {authReducer, geoReducer} from "./entry";

export const rootReducer = combineReducers({
    authReducer,
    geoReducer
})
