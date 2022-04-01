import { IonCard, IonCardTitle, IonChip, IonLabel, IonList, IonSpinner } from '@ionic/react';
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const EgresosSegment = () => {
    const { egresos } = useSelector((state: RootState) => state.admin);
    return (
        <>
            <IonList>
            {
                egresos && egresos.length > 0 ?
                    egresos?.map((egreso, i) => (
                            <IonCard autoCapitalize='true' className='ion-text-center'>
                                <IonLabel>{egreso.concepto.toUpperCase()}</IonLabel>
                                <IonCardTitle>${egreso.monto} </IonCardTitle>
                                {egreso.quien}<br />
                                {egreso.fecha} <br />
                                <IonChip color={!egreso.pago ? 'danger' : 'success'}>
                                    <IonLabel >
                                        {!egreso.pago ? 'No pago' : 'Pagado'}
                                    </IonLabel>
                                </IonChip>
                            </IonCard>
                    ))
                    :
                    <div style={{
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <IonSpinner color='secondary' name="crescent" />
                    </div>
            }
            </IonList>
        </>
    )
}

export default EgresosSegment