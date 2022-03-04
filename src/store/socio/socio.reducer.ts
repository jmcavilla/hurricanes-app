import { types } from "./socio.types"


const initialState:SocioState = {
    data: null,
    checking: false
}

export type SocioState = {
    data: any,
    checking: boolean
}

export const socioReducer = (state = initialState, action) => {
    console.log(action.type)
    console.log(action.payload)
    switch ( action.type ) {
        
        case types.socioSetSocioData:
            return {
                ...state,
                data: action.payload
            }
        case types.socioUnSetSocioData:
            return {
                ...state,
                data: null
            }
        case types.socioChecking: 
            return {
                ...state,
                checking: true
            }
        case types.socioCheckingFinish:
            return {
                ...state,
                checking: false
            }
        default:
            return state;
    }
}