import {BET_LOSE, BET_WIN} from "../types";

const initialState = {
    balance: .3,
    lastWin: 0,
    wins: 0
}
export const balanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case BET_WIN:
            return {
                ...state,
                balance: state.balance + parseFloat(action.payload),
                wins: state.wins + 1,
                lastWin: action.payload
            };
        case BET_LOSE:
            return {...state, balance: state.balance - parseFloat(action.payload)};
        default:
            return state;
    }
}

