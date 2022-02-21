import { Status } from "../../interfaces";
import { SET_USER, UNSET_USER } from "./user.types";

export type User = {
    id: number,
    name: string,
    lastName: string,
    cardId?: number,
    player?: boolean,
    category: string,
    image: string,
    gender: string,
    age: string,
    birthday: string,
    dni: string,
    phone: string,
    status?: Status
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