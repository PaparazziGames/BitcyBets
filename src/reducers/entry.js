export function authorization(state = false, action) {
    switch (action.type) {
        case 'AUTHORIZATION':
            return action.auth;
        default:
            return state;
    }
}
export function userIn(state = false, action) {
    switch (action.type) {
        case 'IS_LOGIN':
            return action.isLogin;
        default:
            return state;
    }
}
export function showPassword(state = false, action) {
    switch (action.type) {
        case 'SHOW_PASSWORD':
            return action.pass;
        default:
            return state;
    }
}

