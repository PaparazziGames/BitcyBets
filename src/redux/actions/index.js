import {AUTHORIZATION, PROHIBITION, REGISTRATION} from "../types";

export function authorization() {
    return {type: AUTHORIZATION}
}
export function prohibition() {
    return {type: PROHIBITION}
}
export function registration() {
    return {type: REGISTRATION}
}
