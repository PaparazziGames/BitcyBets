
export function geoposition() {

    return dispatch => {
        dispatch({type: GET_LOCATION, payload: namePlace})
    }
}

export function bitcoinCourse(data) {
    return dispatch => {
        dispatch({type: GET_USER_DATA, payload: data});
    }
}

