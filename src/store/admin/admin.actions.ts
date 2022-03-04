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