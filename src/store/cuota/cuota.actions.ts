import { fetchConToken } from "../../helpers/fetch"
import { types } from "./cuota.types";

export const startGetCuotasSocio = (socio_id) => {
    return async (dispatch) => {

        try {
            const resp = await fetchConToken('cuota/getCuotasBySocio', { socio_id }, 'POST');
            const body = await resp.json();

            if(body.ok){
                dispatch(setCuotasSocio(body.cuotas))
            }
        } catch (error) {
            
        }

    }
}

const setCuotasSocio = (payload) => ({
    type: types.cuotaGetCuotasSocio,
    payload
})