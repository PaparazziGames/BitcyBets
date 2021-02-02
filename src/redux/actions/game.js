import {CHANGE_DEMO, CLEAR_BET, GET_RATES, GET_USER_DATA, SET_BET_DOWN, SET_BET_UP} from "../types";
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
export function predictUp(value) {
    return async dispatch => {
        const response = await User.predictUp(value);
        const payload = await response.data.status;
        if(payload === "success") {
            await dispatch({type: SET_BET_UP});
        }
        await dispatch(userdata())
    }
}
export function predictDown(value) {
    return async dispatch => {
        const response = await User.predictDown(value);
        const payload = await response.data.status;
        if(payload === "success") {
            await dispatch({type: SET_BET_DOWN});
        }
        await dispatch(userdata())
    }
}
export function predictClear() {
    return dispatch => {
        dispatch({type: CLEAR_BET});
    }
}
export function changeDemo() {
    return async dispatch => {
        const response = await User.changeWallet();
        const payload = await response.data.status;
        if(payload === "success") {
            await dispatch({type: CHANGE_DEMO});
            await dispatch(userdata());
        }
    }
}

