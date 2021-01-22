import {
    AUTHORIZATION,
    GET_COURSE,
    GET_LOCATION,
    PROHIBITION,
    REGISTRATION
} from "../types";

const initialState = {
    auth: false,
    reg: false,
    geoposition: '',
    course: [],
    currentCourse: 0,
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
            return {...state, course: action.payload, currentCourse: action.payload.pop()};
        default:
            return state;
    }
}

