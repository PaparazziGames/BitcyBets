export function authorization(state = true, action) {
    switch (action.type) {
        case 'AUTHORIZATION':
            return {...state, ...{authIn: action.authIn}};
        default:
            return state;
    }
}
export function userIn(state = false, action) {
    switch (action.type) {
        case 'IS_LOGIN':
            return {...state, ...{isLogin: action.isLogin}};
        default:
            return state;
    }
}
export function showPassword(state = true, action) {
    switch (action.type) {
        case 'SHOW_PASSWORD':
            return {...state, ...{passShow: action.passShow}};
        default:
            return state;
    }
}
export function showPasswordRepeat(state = false, action) {
    switch (action.type) {
        case 'SHOW_PASSWORD_REPEAT':
            return {...state, ...{passRepeat: action.passRepeat}};
        default:
            return state;
    }
}

