import { async } from "rxjs";
import { fetchConToken } from "../../helpers/fetch";
import { uiCloseLoading, uiHideAddFamily, uiHideFieldsSocio, uiHideSignIn, uiOpenLoading, uiSetError, uiShowFieldsSocio } from "../ui/ui.actions";
import { types } from "./staff.types";

export const setSocioData = (payload) => ({
    type: types.staffSetMembers,
    payload
})

export const startGetMembers = () => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(
                'staff',
                'GET'
            );
            const body = await resp.json()

            if (body.ok) {
                dispatch(setSocioData(body.members))
            }
        } catch (error) {
        }
        
    }
}