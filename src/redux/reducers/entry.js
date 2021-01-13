import {AUTHORIZATION, BET_LOSE, BET_WIN, GET_COURSE, GET_LOCATION, PROHIBITION, REGISTRATION} from "../types";

const initialState = {
    auth: false,
    reg: false,
    geoposition: '',
    course: [],
    balance: .5
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHORIZATION:
            return {...state, auth: true};
        case PROHIBITION:
            return {...state, auth: false};
        case REGISTRATION:
            return {...state, reg: !state.reg}
        default:
            return state;
    }
}

export const geoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOCATION:
            return {...state, geoposition: action.payload};
        default:
            return state;
    }
}

export const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COURSE:
            return {...state, course: action.payload};
        default:
            return state;
    }
}
export const balanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case BET_WIN:
            return {...state, balance: state.balance + action.payload};
        case BET_LOSE:
            return {...state, balance: state.balance - action.payload};
        default:
            return state;
    }
}
