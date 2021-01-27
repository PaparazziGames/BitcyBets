import {
    AUTHORIZATION,
    GET_COURSE,
    GET_LOCATION, LOGOUT,
    PROHIBITION,
    REGISTRATION
} from "../types";

const initialState = {
    auth: false,
    reg: false,
    geoposition: '',
    course: [],
    currentCourse: 0,
    currentTime: 0,
    logoutQuestion: false
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHORIZATION:
            return {...state, auth: true};
        case PROHIBITION:
            return {...state, auth: false};
        case REGISTRATION:
            return {...state, reg: !state.reg}
        case LOGOUT:
            return {...state, logoutQuestion: !state.logoutQuestion}
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
            return {
                ...state,
                course: action.payload.bitcoins,
                currentCourse: action.payload.bitcoins ? action.payload.bitcoins[action.payload.bitcoins.length - 1] : 0,
                currentTime: action.payload.times ? action.payload.times[action.payload.times.length - 1] : 0,
            };
        default:
            return state;
    }
}

