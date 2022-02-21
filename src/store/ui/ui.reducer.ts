import { types } from "./ui.types";

const initialState: UIState = {
    loading: false,
    showLogin: false,
    showSignIn: false,
    showSignInParent: false
}

export type UIState = {
    loading: boolean,
    showLogin: boolean,
    showSignIn: boolean,
    showSignInParent: boolean
}

export const uiReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case types.uiOpenLoading:
            return {
                ...state,
                loading: true
            }

        case types.uiCloseLoading:
            return {
                ...state,
                loading: false
            }
        case types.uiShowLogin: 
            return {
                ...state,
                showLogin: true
            }
        case types.uiHideLogin: 
            return {
                ...state,
                showLogin: false
            }
        case types.uiShowSignin: 
            return {
                ...state,
                showSignIn: true
            }
        case types.uiHideSignin: 
            return {
                ...state,
                showSignIn: false
            }
        case types.uiShowSigninParent: 
            return {
                ...state,
                showSignInParent: true
            }
        case types.uiHideSigninParent: 
            return {
                ...state,
                showSignInParent: false
            }
        default:
            return state;
    }


}