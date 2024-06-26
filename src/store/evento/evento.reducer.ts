import { types } from "./evento.types";

export type Evento = {
    _id: string,
    fecha: string,
    imagen: string,
    url: string,
    modal: boolean,
    titulo: string,
    descripcion: string,
    show: boolean
}

const initialState: EventoState = {
    eventos: null,
    availableNumbers: null
}

export type Error = { 
    code: number,
    message: string,
    action?: Function
}

export type EventoState = {
    eventos: Evento[],
    availableNumbers: any[]
}

export const eventoReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case types.eventoGetAll:
            return {
                ...state,
                eventos: action.payload
            }
        case types.rifaGetAvailableNumbers:
            return {
                ...state,
                availableNumbers: action.payload
            }
        default:
            return state;
    }


}