import { types } from "./cuota.types"


const initialState = {
    cuotas: null
}

export type CuotaState = {
    cuotas: any[]
}

export const cuotaReducer = (state = initialState, action) => {
    switch ( action.type ) {
        
        case types.cuotaGetCuotasSocio:
            return {
                ...state,
                cuotas: action.payload
            }
        default:
            return state;
    }
}