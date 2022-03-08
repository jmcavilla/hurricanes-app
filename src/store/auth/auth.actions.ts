import { fetchConToken, fetchSinToken } from '../../helpers/fetch';
import { getSocioData, unsetSocioData } from '../socio/socio.actions';
import { uiCloseLoading, uiHideLogin, uiHideSignIn, uiOpenLoading, uiSetError } from '../ui/ui.actions';
import { setUserAction, unsetUserAction } from '../user/user.actions';
import { types } from './auth.types';



export const startLogin = ( email, password ) => {
    return async( dispatch ) => {
        try {
            
            dispatch(uiOpenLoading())
            const resp = await fetchSinToken( 'auth', { email, password }, 'POST' );
            const body = await resp.json();

            if( body.ok ) {
                localStorage.setItem('token', body.token );
                localStorage.setItem('token-init-date', new Date().getTime().toString() );
                localStorage.setItem('email', body.email);
                setTimeout(() => {
                    
                    dispatch( login({
                        uid: body.uid,
                        name: body.email
                    }) )
                    
                    dispatch(setUserAction({
                        email,
                        token: body.token,
                        uid: body.uid,
                        status: body.status,
                        admin: body.admin,
                        name: body.name
                    }))
                    dispatch(getSocioData(body.uid));
                    dispatch(uiCloseLoading())
                    dispatch( uiHideLogin());
                    dispatch( uiHideSignIn());
                }, 5000);
            }else{
                dispatch(uiCloseLoading());
                dispatch(uiSetError({
                    code: 500,
                    message: 'El email y/o la contrasña son incorrectas. Por favor, intentelo nuevamente.'
                }))
            }
        
        } catch (error) {
            dispatch(uiCloseLoading());
            dispatch(uiSetError({
                code: 500,
                message: 'Ocurrio un error al iniciar sesión. Por favor, intentelo nuevamente.'
            }))
        }

    }
}

export const startLogout = () => {
    return async(dispatch) => {
        dispatch(uiOpenLoading())
        dispatch(unsetUserAction());
        dispatch(unsetSocioData());
        dispatch( logout() );
        window.localStorage.clear()
        setTimeout(() => {
            dispatch(uiCloseLoading())
        }, 1000);
    }
}

export const startRegister = ( email, password, name ) => {
    return async( dispatch ) => {
        try {
            dispatch(uiOpenLoading())
            const resp = await fetchSinToken( 'auth/new', { email, password, name }, 'POST' );
            const body = await resp.json();
            
            if( body.ok ) {
                localStorage.setItem('token', body.token );
                localStorage.setItem('token-init-date', new Date().getTime().toString() );
                localStorage.setItem('email', body.email);
                dispatch( login({
                    uid: body.uid,
                    name: body.email
                }) )
                dispatch( setUserAction({
                    email: body.email,
                    token: body.token,
                    uid: body.uid,
                    status: body.status,
                    admin: body.admin,
                    name: body.name
                }))
                setTimeout(() => {
                    dispatch(uiCloseLoading())
                    dispatch(uiHideSignIn());
                }, 1000);
            }else{
                dispatch(uiCloseLoading());
                dispatch(uiSetError({
                    code: 500,
                    message: body.msg
                }))
            }
        } catch (error) {
            dispatch(uiSetError({
                code: 500,
                message: 'Ocurrio un error al registrar el usuario. Por favor, intentelo nuevamente.'
            }))
            dispatch(uiCloseLoading());
        }finally{
            dispatch(uiCloseLoading())
        }


    }
}

export const startChecking = () => {
    return async(dispatch) => {
        try {
            const token = localStorage.getItem('token');
            if(token){

                const resp = await fetchConToken( 'auth/renew' );
                const body = await resp.json();
                
                if( body.ok ) {
                    localStorage.setItem('token', body.token );
                    localStorage.setItem('token-init-date', new Date().getTime().toString() );

                    dispatch(updateUserData())
                    dispatch(getSocioData(body.uid));
                    dispatch( checkingFinish() );
                }else{
                    dispatch(uiCloseLoading());
                }
            }
        } catch (error) {
            dispatch(uiSetError({
                code: 500,
                message: 'Ocurrio un error al verificar la sesión. Por favor, inicie sesión.'
            }))
            dispatch(uiCloseLoading());
        }finally{
            dispatch(uiCloseLoading())
        }
    }
}

export const updateUserData = () => {
    return async (dispatch) => {
        const resp = await fetchConToken('auth/data', { email: localStorage.getItem('email') }, 'POST')
        const body = await resp.json();
        dispatch( login({
            uid: body.uid,
            name: body.email
        }) )
        dispatch( setUserAction({
            email: body.email,
            token: body.token,
            uid: body.uid,
            status: body.status,
            admin: body.admin,
            name: body.name
        }))
    }
}

export const validateEmail = (confirmationCode) => {
    return async(dispatch) => {
        try {
            dispatch(uiOpenLoading());
            const email=  localStorage.getItem('email')
            const resp = await fetchConToken( 'auth/confirm', { email, confirmationCode }, 'POST' );
            const body = await resp.json();

            if( body.ok ) {
                dispatch(updateUserData());
                dispatch(uiCloseLoading());
            }else{
                dispatch(uiCloseLoading());
                dispatch(uiSetError({
                    code: 500,
                    message: body.msg
                }))
            }
        } catch (error) {
            dispatch(uiSetError({
                code: 500,
                message: 'Ocurrio un error al verificar el codigo. Por favor, intentelo de nuevo.'
            }))
            dispatch(uiCloseLoading());
        }finally{
            dispatch(uiCloseLoading())
        }
    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish });



const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});

const logout = () => ({ type: types.authLogout })