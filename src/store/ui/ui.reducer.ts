import { type } from "os";
import { types } from "./ui.types";

const initialState: UIState = {
    loading: false,
    showLogin: false,
    showSignIn: false,
    showSignInParent: false,
    showFieldsSocio: false,
    showFieldsSocioAdmin: false,
    showAddFamily: false,
    showValidateEmail: false,
    error: null
}

export type Error = { 
    code: number,
    message: string,
    action?: Function
}

export type UIState = {
    loading: boolean,
    showLogin: boolean,
    showSignIn: boolean,
    showSignInParent: boolean,
    showFieldsSocio: boolean,
    showFieldsSocioAdmin: boolean,
    showValidateEmail: boolean,
    showAddFamily: boolean,
    error: Error
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
        case types.uiShowFieldsSocio: 
            return {
                ...state,
                showFieldsSocio: true
            }
        case types.uiHideFieldsSocio: 
            return {
                ...state,
                showFieldsSocio: false
            }
        case types.uiShowFieldsSocioAdmin: 
            return {
                ...state,
                showFieldsSocioAdmin: true
            }
        case types.uiHideFieldsSocioAdmin: 
            return {
                ...state,
                showFieldsSocioAdmin: false
            }
        case types.uiSetError:
            return {
                ...state,
                error: action.payload
            }
        case types.uiUnSetError:
            return {
                ...state,
                error: null
            }
        case types.uiShowValidateEmail: 
            return {
                ...state,
                showValidateEmail: true
            }
        case types.uiHideValidateEmail: 
            return {
                ...state,
                showValidateEmail: false
            }
        case types.uiShowAddFamily: 
            return {
                ...state,
                showAddFamily: true
            }
        case types.uiHideAddFamily: 
            return {
                ...state,
                showAddFamily: false
            }
        default:
            return state;
    }


}