import { fetchConToken } from "../../helpers/fetch";
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
        debugger;
        if(user_id === 'TEST'){
            dispatch(setSocioData({
                user_id: 'TEST',
                numeroSocio: 1,
                nombre: 'Juan Manuel',
                apellido: 'Cavilla',
                sexo: 'M',
                dni: '36477664',
                fecha_nac: '07/08/1991',
                categoria: 'S',
                socioHuracan: false,
                activo: true,
                telefono: '1130647410',
                foto: `${process.env.PUBLIC_URL}/assets/images/selfie.jpg`
            }));
        }else{
            const resp = await fetchConToken(
                'socio',
                {
                    user_id
                },
                'POST'
            );
            const body = await resp.json()

            dispatch(setSocioData(body.data));
        }
    }
}