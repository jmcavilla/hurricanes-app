import { types } from "./staff.types"

type Staff = {
    nombre: string,
    posicion: number,
    photo: string,
    descripcion: string
}

const initialState:StaffState = {
    members: null
}

export type StaffState = {
    members: Staff[]
}

export const staffReducer = (state = initialState, action) => {
    switch ( action.type ) {
        
        case types.staffSetMembers:
            return {
                ...state,
                members: action.payload
            }

        default:
            return state;
    }
}