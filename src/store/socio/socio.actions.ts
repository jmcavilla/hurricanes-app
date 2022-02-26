import { async } from "rxjs";
import { fetchConToken } from "../../helpers/fetch";
import { uiCloseLoading, uiHideFieldsSocio, uiHideSignIn, uiOpenLoading, uiShowFieldsSocio } from "../ui/ui.actions";
import { types } from "./socio.types";

export const setSocioData = (payload) => ({
    type: types.socioSetSocioData,
    payload
})

export const unsetSocioData = () => ({
    type: types.socioUnSetSocioData
})

export const getSocioData = (user_id) => {
    return async(dispatch) => {
        
        const resp = await fetchConToken(
            'socio',
            {
                user_id
            },
            'POST'
        );
        const body = await resp.json()

        dispatch(setSocioData(body.data));
        dispatch(uiCloseLoading())
    }
}

export const createSocio = (data) => {
    return async(dispatch)=>{
        try {
            data.tipo_socio = 'N';
            dispatch(uiOpenLoading())
            const resp = await fetchConToken('socio/new', data, 'POST');
            const body = await resp.json()
            dispatch(uiHideFieldsSocio())
            dispatch(uiHideSignIn());
            dispatch(uiCloseLoading());
            dispatch(getSocioData(data.user_id));
        } catch (error) {
            
        }
    }
}