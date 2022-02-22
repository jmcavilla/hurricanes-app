import { types } from "./socio.types"


const initialState = {
    data: null
}

export type SocioState = {
    data: any
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
        default:
            return state;
    }
}