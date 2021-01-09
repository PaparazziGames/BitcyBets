import { combineReducers } from "redux";
import {authorization, showPassword, showPasswordRepeat, userIn} from "./entry";

export default combineReducers({
    authorization,
    userIn,
    showPassword,
    showPasswordRepeat
})
