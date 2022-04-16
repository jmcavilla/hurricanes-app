import { fetchConToken, fetchSinToken } from '../../helpers/fetch';
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

export const startGetAvailableNumbers = (rifa) => {
    return async (dispatch) => {
        try {
            const resp = await fetchSinToken(`rifa/taken`);
            const data = await resp.json();
            let taken: any[] = [];
            let numbers: any[] = [];
            console.log(data)

            if (data.ok) {
                taken = data.numbers;
                const numbersTaken = [];
                for (let i = 0; i < taken.length; i++) {
                    const element = taken[i];
                    numbersTaken.push(element.numero)
                }
                for (let index = 0; index < rifa.numbers; index++) {
                    if (!numbersTaken.includes(index + 1)) {
                        numbers.push({ numero: index + 1, selected: false });
                    }else {
                        numbers.push({ numero: index + 1, selected: true });
                    }
                }
                dispatch(rifaGetAvailable(numbers))
                return numbers;
            }
        } catch (error) {

        }
    }
}

export const eventoGetAll = (payload) => ({ type: types.eventoGetAll, payload });
export const rifaGetAvailable = (payload) => ({ type: types.rifaGetAvailableNumbers, payload });
