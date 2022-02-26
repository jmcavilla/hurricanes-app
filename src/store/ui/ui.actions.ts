import { Error } from './ui.reducer';
import { types } from './ui.types';



export const uiOpenLoading = () => ({ type: types.uiOpenLoading });
export const uiCloseLoading = () => ({ type: types.uiCloseLoading });

export const uiShowLogin = () => ({ type: types.uiShowLogin });
export const uiHideLogin = () => ({ type: types.uiHideLogin });

export const uiShowSignIn = () => ({ type: types.uiShowSignin });
export const uiHideSignIn = () => ({ type: types.uiHideSignin });

export const uiShowSignInParent = () => ({ type: types.uiShowSigninParent });
export const uiHideSignInParent = () => ({ type: types.uiHideSigninParent });

export const uiShowFieldsSocio = () => ({ type: types.uiShowFieldsSocio });
export const uiHideFieldsSocio = () => ({ type: types.uiHideFieldsSocio });

export const uiSetError = (payload: Error) => ({ type: types.uiSetError, payload })
export const uiUnSetError = () => ({ type: types.uiUnSetError })

export const uiShowValidateEmail = () => ({ type: types.uiShowValidateEmail })
export const uiHideValidateEmail = () => ({ type: types.uiHideValidateEmail })