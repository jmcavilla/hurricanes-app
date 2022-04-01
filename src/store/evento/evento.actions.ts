import { fetchConToken } from '../../helpers/fetch';
import { Error } from './evento.reducer';
import { types } from './evento.types';

export const startGetAllEventos = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken( 'evento' );
            const body = await resp.json();
            if (body.ok) {
                dispatch(eventoGetAll(body.eventos));
            }
        } catch (error) {
            console.error(error)
        }
    }
} 

export const eventoGetAll = (payload) => ({ type: types.eventoGetAll, payload });
