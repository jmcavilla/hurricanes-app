import { fetchConToken } from "../../helpers/fetch";
import { User } from "./user.reducer";
import { SET_USER, UNSET_USER } from "./user.types";


export const setUserAction = (payload: User) => ({
    type: SET_USER,
    payload
})

export const unsetUserAction = () => ({
    type: UNSET_USER
})