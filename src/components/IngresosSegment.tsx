import { IonCard, IonCardTitle, IonChip, IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonSpinner } from '@ionic/react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const IngresosSegment = () => {
    const { ingresos } = useSelector((state: RootState) => state.admin);
    
    return (
        <>
            <IonList>
            {
                ingresos && ingresos.length > 0 ?
                    ingresos?.map((ingreso, i) => (
                        <>
                                <IonCard autoCapitalize='true' className='ion-text-center'>
                                    <IonLabel>{ingreso.concepto.toUpperCase()}</IonLabel>
                                    <IonCardTitle>${ingreso.monto}</IonCardTitle>
                                    {ingreso.quien}<br />
                                    {ingreso.fecha}<br />
                                    <IonChip color={ingreso.motivo === 'ROPA' ? 'primary' : (ingreso.motivo === 'CUOTA' ? 'secondary' : 'tertiary')}>
                                       <IonLabel>{ingreso.motivo}</IonLabel>
                                    </IonChip>
                                </IonCard>
                            
                        </>
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

export default IngresosSegment;