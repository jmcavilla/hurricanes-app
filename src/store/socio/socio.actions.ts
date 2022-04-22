import { async } from "rxjs";
import { fetchConToken } from "../../helpers/fetch";
import { uiCloseLoading, uiHideAddFamily, uiHideFieldsSocio, uiHideSignIn, uiOpenLoading, uiSetError, uiShowFieldsSocio } from "../ui/ui.actions";
import { types } from "./socio.types";

export const setSocioData = (payload) => ({
    type: types.socioSetSocioData,
    payload
})

export const unsetSocioData = () => ({
    type: types.socioUnSetSocioData
})

export const setFamilyData = (payload) => ({
    type: types.socioSetFamilyData,
    payload
})

export const unsetFamilyData = () => ({
    type: types.socioUnSetFamilyData,
})

export const getSocioData = (user_id, showAlert = false) => {
    return async(dispatch) => {
        try {
            dispatch(uiOpenLoading())
            dispatch(checking())
            const resp = await fetchConToken(
                'socio',
                {
                    user_id
                },
                'POST'
            );
            const body = await resp.json()

            if (body.ok) {
                dispatch(uiCloseLoading());
                dispatch(checkingFinish())
                dispatch(setSocioData(body.data));
                dispatch(getFamily(user_id));
            } else {
                dispatch(getFamily(user_id));
                dispatch(uiCloseLoading());
                dispatch(checkingFinish());
                if(showAlert){
                    dispatch(uiSetError({
                        code: 500,
                        message: body.msg
                    }))
                }
            }
        } catch (error) {
            dispatch(checkingFinish());
            dispatch(uiSetError({
                code: 500,
                message: 'Ocurrio un error al obtener los datos del socio'
            }))
        }
        
    }
}

export const createSocio = (data) => {
    return async(dispatch)=>{
        try {
            data.tipo_socio = 'N';
            dispatch(uiOpenLoading())
            const resp = await fetchConToken('socio/new', data, 'POST');
            const body = await resp.json()

            if(body.ok){

                dispatch(uiHideFieldsSocio())
                dispatch(uiHideSignIn());
                dispatch(uiCloseLoading());
                dispatch(getSocioData(data.user_id));
            }else{
                dispatch(uiCloseLoading());
                dispatch(uiSetError({
                    code: 500,
                    message: body.msg
                }))
            }
        } catch (error) {
            dispatch(uiCloseLoading());
            dispatch(uiSetError({
                code: 500,
                message: 'Ocurrio un error al actualizar los datos. Por favor, intentelo nuevamente.'
            }))
        }
    }
}

export const createFamily = (data) => {
    return async(dispatch)=>{
        try {
            data.tipo_socio = 'N';
            dispatch(uiOpenLoading())
            const resp = await fetchConToken('socio/newFamily', data, 'POST');
            const body = await resp.json()

            if(body.ok){
                dispatch(uiHideFieldsSocio())
                dispatch(uiHideSignIn());
                dispatch(uiCloseLoading());
                dispatch(uiHideAddFamily());
                dispatch(getFamily(data.user_id));
            }else{
                dispatch(uiCloseLoading());
                dispatch(uiSetError({
                    code: 500,
                    message: body.msg
                }))
            }
        } catch (error) {
            dispatch(uiCloseLoading());
            dispatch(uiSetError({
                code: 500,
                message: 'Ocurrio un error al actualizar los datos. Por favor, intentelo nuevamente.'
            }))
        }
    }
}

export const getFamily = (user_id, showAlert = false) => {
    return async(dispatch) => {
        
        try {
            dispatch(uiOpenLoading())
            dispatch(checking())
            const resp = await fetchConToken(
                'socio/family',
                {
                    user_id
                },
                'POST'
            );
            const body = await resp.json()

            if (body.ok) {
                dispatch(uiCloseLoading());
                dispatch(checkingFinish())
                dispatch(setFamilyData(body.familia));
            } else {
                dispatch(uiCloseLoading());
                dispatch(checkingFinish());
                if(showAlert){
                    dispatch(uiSetError({
                        code: 500,
                        message: body.msg
                    }))
                }
            }
        } catch (error) {
            dispatch(checkingFinish());
            dispatch(uiSetError({
                code: 500,
                message: 'Ocurrio un error al obtener los datos del socio'
            }))
        }
        
    }
}

const checking = () => ({
    type: types.socioChecking
})

const checkingFinish = () => ({
    type: types.socioCheckingFinish
})