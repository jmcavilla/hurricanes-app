import { types } from './auth.types';

const initialState = {
    checking: true,
    uid: null,
    name: null
}

export type AuthState = {
    checking: boolean,
    uid: string,
    email: string
}

export const authReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking: false
            }

        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }

        case types.authLogout:
            return {
                checking: false
            }


        default:
            return state;
    }

}


