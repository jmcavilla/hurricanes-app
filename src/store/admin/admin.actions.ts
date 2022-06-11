import { fetchConToken } from "../../helpers/fetch"
import { uiSetError } from "../ui/ui.actions"
import { types } from "./admin.types"


export const startGetEgresos = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('contable/egresos')
            const body = await resp.json();
            let SUM:number = 0; 
            if (body.ok) {

                body.egresos.forEach(element => {
                    if(element.pago){
                        SUM += element.monto
                    }
                });
                dispatch(setEgresosCount(SUM));
                dispatch(setEgresos(body.egresos))
            }

        } catch (error) {
            
        }
    }
}

export const startGetIngresos = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('contable/ingresos')
            const body = await resp.json();
            let SUM:number = 0; 
            if (body.ok) {

                body.ingresos.forEach(element => {
                    SUM += element.monto
                });
                dispatch(setIngresosCount(SUM));
                dispatch(setIngresos(body.ingresos))
            }
        } catch (error) {
            
        }
    }
}

export const startGetRifa = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('rifa')
            const body = await resp.json();
            if(body.ok){

                dispatch(setRifa(
                    body.rifa
                ))
            }
        } catch (error) {
            
        }
    }
}

export const startGetSociosActivos = () => {
    return async (dispatch) => {
        try {
            // dispatch(uiOpenLoading())
            const resp = await fetchConToken( 'socio/socios' );
            const body = await resp.json();
            if (body.ok) {
                
                dispatch(setSociosActivos(
                    body.socios.sort((a,b) => ( new Number(a.numero_socio) > new Number(b.numero_socio) ) ? 1 : (( new Number(b.numero_socio) > new Number(a.numero_socio)) ? -1 : 0))
                ));
            }

            // dispatch(uiCloseLoading())
        } catch (error) {
            
        }
    }
}

export const getSociosPending = () => {
    return async (dispatch) => {

        try {
            const res = await fetchConToken('socio/sociosPending');
            const body = await res.json();

            dispatch(setSociosPending(body.data || []))
        } catch (error) {
            
        }

    }
}

export const startGetTicketsRifa = (rifa) => {
    return async (dispatch) => {
        try {
            try {
                const resp = await fetchConToken('rifa/pending', { id_rifa: rifa._id }, 'POST');
                const body = await resp.json();
                if (body.ok) {
                    dispatch(setTicketsTaken(body.numbers));
                    // dispatch(setTicketsTaken(rifa));
                
                }
            } catch (error) {
                console.error(error)
            }
        } catch (error) {

        }
    }
}

export const startGetTicketsAccepted = (id_rifa) => {
    return async (dispatch) => {
        try {
            try {
                const resp = await fetchConToken('rifa/accepted', { id_rifa }, 'POST');
                const body = await resp.json();
                if (body.ok) {
                    dispatch(setTicketsAccepted(body.accepted));
                }
            } catch (error) {
                console.error(error)
            }
        } catch (error) {

        }
    }
}

const setEgresos = (payload) => ({
    type: types.adminSetEgresos,
    payload
})

const setIngresos = (payload) => ({
    type: types.adminSetIngresos,
    payload
})

const setEgresosCount = (payload) => ({
    type: types.adminSetEgresosCount,
    payload
})

const setIngresosCount = (payload) => ({
    type: types.adminSetIngresosCount,
    payload
})

const setRifa = (payload) => ({
    type: types.adminSetRifa,
    payload
})

const setSociosActivos = (payload) => ({
    type: types.adminSetSociosActivos,
    payload
})

const setSociosPending = (payload) => ({
    type: types.adminSetSociosPendientes,
    payload
})

const setTicketsAccepted = (payload) => ({
    type: types.adminGetTicketsAccepted, 
    payload 
})

const setTicketsTaken = (payload) => ({ 
    type: types.adminGetTicketsTaken, 
    payload 
})