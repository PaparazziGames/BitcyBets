import {
    AUTHORIZATION, CREATE_AD,
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
    lastSeconds: undefined,
    logoutQuestion: false,
    createAd: false
}

export const switchOptions = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_AD:
            return {...state, createAd: !state.createAd};
        default:
            return state;
    }
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHORIZATION:
            if (localStorage.getItem('token') !== null) {
                return {...state, auth: true};
            } else {
                return {...state, auth: false};
            }
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
                lastSeconds: action.payload.lastSeconds
            };
        default:
            return state;
    }
}

