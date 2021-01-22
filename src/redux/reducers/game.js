import {BET_LOSE, BET_WIN, CLOSE_CONGRATULATION, GET_RATES, GET_USER_DATA} from "../types";

const initialState = {
    name: '',
    balance: 1,
    lastWin: 0,
    lastgame: 0,
    wins: 0,
    '3wins': false,
    btcWallet: '',
    isDemo: true,
    congratulation: false,
    predict: 'white',
    down: 0,
    up: 0,
    upBets: 0,
    downBets: 0
}
export const balanceReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_USER_DATA:
            if (action.payload.isDemo) {
                return {
                    ...state,
                    '3wins': action.payload['3wins'],
                    balance: action.payload.balance,
                    btcWallet: action.payload.btcWallet,
                    wins: action.payload.wins + 1,
                    lastWin: action.payload.lastWin,
                    lastgame: action.payload.lastgame,
                    name: action.payload.name,
                    isDemo: action.payload.isDemo
                };
            } else {
                return {
                    ...state,
                    '3wins': action.payload['3wins'],
                    balance: action.payload.demoBalance,
                    btcWallet: action.payload.btcWallet,
                    wins: action.payload.wins + 1,
                    lastWin: action.payload.lastWin,
                    lastgame: action.payload.lastgame,
                    name: action.payload.name,
                    isDemo: action.payload.isDemo
                };
            }
        case GET_RATES:
            return {
                ...state,
                down: action.payload.down.peoples,
                up: action.payload.up.peoples,
                upBets: action.payload.up.bitcoins,
                downBets: action.payload.down.bitcoins,
            };
        case BET_WIN:
            return {
                ...state,
                balance: state.balance + parseFloat(action.payload),
                wins: state.wins + 1,
                lastWin: action.payload,
                congratulation: true,
                predict: 'green'
            };
        case BET_LOSE:
            return {
                ...state,
                balance: state.balance - parseFloat(action.payload),
                predict: 'red'
            };
        case CLOSE_CONGRATULATION:
            return {...state, congratulation: false};
        default:
            return state;
    }
}

