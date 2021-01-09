export function authorization(bool) {
    return {
        type: 'AUTHORIZATION',
        auth: bool
    };
}

export function userIn(bool) {
    return {
        type: 'IS_LOGIN',
        isLogin: bool
    };
}

export function showPassword(bool) {
    return {
        type: 'SHOW_PASSWORD',
        passShow: bool
    };
}

export function showPasswordRepeat(bool) {
    return {
        type: 'SHOW_PASSWORD_REPEAT',
        passRepeat: bool
    };
}
// export function betsProgress(items) {
//     return {
//         type: 'BETS_PROGRESS',
//         items
//     };
// }
