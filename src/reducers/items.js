import { combineReducers } from "redux";
import {authorization, showPassword, userIn} from "./entry";

export default combineReducers({
    authorization,
    userIn,
    showPassword
})
