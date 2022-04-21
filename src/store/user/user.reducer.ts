import { Status } from "../../interfaces";
import { SET_USER, UNSET_USER } from "./user.types";

export type User = {
    email: string,
    token: string,
    uid: string,
    status?: 'Pending' | 'Active',
    admin: boolean,
    name: string,
    admin_count: boolean
}

export type UserState = {
    user: User | undefined
}

const initialState: UserState = {
    user: undefined,
};

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case UNSET_USER:
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
};

export default userReducer;