import { types } from "./admin.types";


const initialState = {
    egresos: [],
    ingresos: [],
    egresosCount: 0,
    ingresosCount: 0
}

export type AdminState = {
    egresos: any[],
    ingresos: any[],
    egresosCount: number,
    ingresosCount: number
}

export const adminReducer = (state: AdminState = initialState, action) => {

    switch (action.type) {
        case types.adminSetEgresos:
            return {
                ...state,
                egresos: action.payload
            }
        case types.adminSetIngresos:
            return {
                ...state,
                ingresos: action.payload
            }
        case types.adminSetEgresosCount:
            return {
                ...state,
                egresosCount: action.payload
            }
        case types.adminSetIngresosCount:
            return {
                ...state,
                ingresosCount: action.payload
            }
        default:
            return { ...state };
    }

}