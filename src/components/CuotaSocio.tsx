import { IonButton, IonChip, IonItem, IonLabel } from '@ionic/react';
import moment from 'moment';
import React, { useState } from 'react'
import InfoCuotaPaga from './InfoCuotaPaga';

const CuotaSocio = ({ cuota, getCuotaSocio, socio }) => {
    const [showInfoCuota, setShowInfoCuota] = useState(false);
    return (
        <>
            <IonItem fill='outline' color='secondary' lines='none' className='ion-margin'>
                <IonLabel>
                    <strong>{moment.months(cuota.mes - 1).toLocaleUpperCase()}</strong>
                    <h3>${cuota.monto}</h3>

                </IonLabel>
                <IonChip color={cuota.status === 'Pending' ? 'danger' : 'success'} onClick={() => {
                    if(cuota.status !== 'Pending'){
                        setShowInfoCuota(!showInfoCuota);
                    }
                }}>
                    <IonLabel >
                        {cuota.status === 'Pending' ? 'No pago' : 'Pagado'} {cuota.status === 'Accepted' && `- ${cuota.fecha_pago}`}
                    </IonLabel>
                </IonChip>
                {
                    cuota.status === 'Pending' && 
                    <IonButton color='secondary' fill='outline' onClick={() => { setShowInfoCuota(!showInfoCuota) }}>MARCAR PAGADO</IonButton>
                }
            </IonItem>
            {
                showInfoCuota &&
                <InfoCuotaPaga cuota={cuota} close={() => {
                    setShowInfoCuota(false);
                    getCuotaSocio();
                }}
                socio={socio}
                pagar={cuota.status === 'Pending'} />
            }
        </>
    )
}

export default CuotaSocio