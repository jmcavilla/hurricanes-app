import { types } from "./socio.types"


const initialState = {
    data: null
}

export type SocioState = {
    data: any
}

export const socioReducer = (state = initialState, action) => {
    switch ( action.type ) {
        
        case types.socioSetSocioData:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}