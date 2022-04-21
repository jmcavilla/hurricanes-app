import { types } from "./admin.types";

interface Numero {
    numero: number, selected: boolean
}

export interface Ticket {
    dni: string,
    tel: string,
    email: string,
    name: string,
    comprobante: string,
    id_pago: string,
    fecha_pago: number,
    numeros: Numero[],
    id_rifa:string,
    status: string
}

const initialState = {
    egresos: [],
    ingresos: [],
    egresosCount: 0,
    ingresosCount: 0,
    rifa: null,
    sociosActivos: [],
    sociosPendientes: [],
    ticketsAccepted: [],
    ticketsPending: []
}

export type AdminState = {
    egresos: any[],
    ingresos: any[],
    egresosCount: number,
    ingresosCount: number,
    rifa: any,
    sociosActivos: any[],
    sociosPendientes: any[],
    ticketsAccepted: Ticket[],
    ticketsPending: Ticket[]
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
        case types.adminSetRifa:
            return {
                ...state,
                rifa: action.payload
            }
        case types.adminSetSociosActivos:
            return {
                ...state,
                sociosActivos: action.payload
            }
        case types.adminSetSociosPendientes:
            return {
                ...state,
                sociosPendientes: action.payload
            }
        case types.adminGetTicketsTaken: 
            return {
                ...state,
                ticketsPending: action.payload
            }
            case types.adminGetTicketsAccepted: 
            return {
                ...state,
                ticketsAccepted: action.payload
            }
        default:
            return { ...state };
    }

}