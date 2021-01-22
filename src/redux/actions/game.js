import {GET_RATES, GET_USER_DATA} from "../types";
import {User} from "../../api/User";

export function userdata() {
    return async dispatch => {
        const response = await User.userdata();
        const payload = await response.data.data;
        await dispatch({type: GET_USER_DATA, payload});
    }
}
export function rates() {
    return async dispatch => {
        const response = await User.rate();
        const payload = await response.data.data;
        await dispatch({type: GET_RATES, payload});
    }
}

