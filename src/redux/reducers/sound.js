import {PLAY_BELL, PLAY_CLACK, PLAY_CLICK, PLAY_MONEY, PLAY_TIC, STOP_ALL} from "../types";

const initialState = {
    play: ''
}
export const soundReducer = (state = initialState, action) => {
    switch (action.type) {
        case PLAY_BELL:
            return {...state, play: 'bell'};
        case PLAY_CLACK:
            return {...state, play: 'clack'};
        case PLAY_CLICK:
            return {...state, play: 'click'}
        case PLAY_MONEY:
            return {...state, play: 'money'}
        case PLAY_TIC:
            return {...state, play: 'tic'}
        case STOP_ALL:
            return {...state, play: ''}
        default:
            return state;
    }
}
