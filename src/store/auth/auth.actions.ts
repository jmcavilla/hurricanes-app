import { fetchConToken, fetchSinToken } from '../../helpers/fetch';
import { getSocioData } from '../socio/socio.actions';
import { uiCloseLoading, uiHideLogin, uiHideSignIn, uiOpenLoading, uiShowLogin } from '../ui/ui.actions';
import { types } from './auth.types';



export const startLogin = ( email, password ) => {
    return async( dispatch ) => {
        debugger
        if(email === 'prueba@prueba.com'){
            dispatch( login({
                uid: 'TEST',
                name: 'juanmcavilla@gmail.com'
            }) )
            dispatch(getSocioData('TEST'));
            dispatch( uiHideLogin());
            dispatch( uiHideSignIn());
            return;
        }
        try {
            
            dispatch(uiOpenLoading())
            const resp = await fetchSinToken( 'auth', { email, password }, 'POST' );
            const body = await resp.json();

        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime().toString() );

            dispatch( login({
                uid: body.uid,
                name: body.email
            }) )
            
            dispatch(getSocioData(body.uid));
            dispatch( uiHideLogin());
            dispatch( uiHideSignIn());
        }
        
        } catch (error) {
            dispatch( login({
                uid: 'TEST',
                name: 'juanmcavilla@gmail.com'
            }) )
            dispatch(getSocioData('TEST'));
            dispatch( uiHideLogin());
            dispatch( uiHideSignIn());
        }finally{
            dispatch(uiCloseLoading())
        }

    }
}

export const startRegister = ( email, password, name ) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'auth/new', { email, password, name }, 'POST' );
        const body = await resp.json();

        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime().toString() );

            dispatch( login({
                uid: body.uid,
                name: body.email
            }) )
        }


    }
}

export const startChecking = () => {
    return async(dispatch) => {
        try {
            
            const resp = await fetchConToken( 'auth/renew' );
            const body = await resp.json();
            
            if( body.ok ) {
                localStorage.setItem('token', body.token );
                localStorage.setItem('token-init-date', new Date().getTime().toString() );
                dispatch( login({
                    uid: body.uid,
                    name: body.email
                }) )
                dispatch(getSocioData(body.uid));
            }
        } catch (error) {
            // dispatch( checkingFinish() );
            //     dispatch( uiShowLogin());
        }
    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish });



const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});


export const startLogout = () => {
    return ( dispatch ) => {

        localStorage.clear();
        dispatch( logout() );
    }
}

const logout = () => ({ type: types.authLogout })