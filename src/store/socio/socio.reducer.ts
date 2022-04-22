import { types } from "./socio.types"


const initialState:SocioState = {
    data: null,
    checking: false,
    familia: null
}

export type SocioState = {
    data: any,
    checking: boolean,
    familia: any[]
}

export const socioReducer = (state = initialState, action) => {
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
        case types.socioSetFamilyData:
            return {
                ...state,
                familia: action.payload
            }
        default:
            return state;
    }
}