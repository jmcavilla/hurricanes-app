import { IonActionSheet, IonAlert, IonButton, IonCard, IonCardTitle, IonChip, IonCol, IonContent, IonHeader, IonIcon, IonLabel, IonList, IonModal, IonRow, IonSpinner, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import { checkmarkCircleSharp, checkmarkSharp, closeCircleSharp, trashSharp } from 'ionicons/icons';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchConToken } from '../helpers/fetch';
import { RootState } from '../store';
import { startGetEgresos, startGetIngresos } from '../store/admin/admin.actions';

const EgresosSegment = () => {
    const { egresos } = useSelector((state: RootState) => state.admin);
    const [present, dismiss] = useIonLoading();
    const dispatch = useDispatch();
    const [showAlertOk, setShowAlertOk] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);
    const [showActionSheet, setShowActionSheet] = useState(false);
    const [selected, setSelected] = useState(null);
    const marcarPagado = async () => {
        present()
        // return Swal.fire('Error', 'Las contraseñas deben de ser iguales','error');
        console.log('first')
        try {
            const resp = await fetchConToken('contable/marcar', { id: selected }, 'POST');
            const body = await resp.json();

            if (body.ok) {
                dismiss();
                dispatch(startGetIngresos());
                dispatch(startGetEgresos());
                setShowAlertOk(true);
            } else {
                dismiss();
                setShowAlertError(true);
            }
        } catch (error) {
            dismiss();
            setShowAlertError(true);
        }
    }

    const eliminar = async () => {
        present()
        // return Swal.fire('Error', 'Las contraseñas deben de ser iguales','error');
        console.log('first')
        try {
            const resp = await fetchConToken('contable/eliminar', { id: selected }, 'DELETE');
            const body = await resp.json();

            if (body.ok) {
                dismiss();
                dispatch(startGetIngresos());
                dispatch(startGetEgresos());
                setShowAlertOk(true);
            } else {
                dismiss();
                setShowAlertError(true);
            }
        } catch (error) {
            dismiss();
            setShowAlertError(true);
        }
    }
    return (
        <>
            <IonList>
                {
                    egresos && egresos.length > 0 ?
                        egresos?.map((egreso, i) => (
                            <IonCard key={i} autoCapitalize='true' className='ion-text-center'>
                                <IonLabel>{egreso.concepto.toUpperCase()}</IonLabel>
                                <IonCardTitle>${egreso.monto} </IonCardTitle>
                                {egreso.quien}<br />
                                {egreso.fecha} <br />
                                <IonChip color={!egreso.pago ? 'danger' : 'success'} onClick={() => {
                                    if(!egreso.pago){
                                        setSelected(egreso._id)
                                        setShowActionSheet(true);
                                    }
                                }}>
                                    {!egreso.pago
                                        ?
                                        <IonIcon src={closeCircleSharp} />
                                        :
                                        <IonIcon src={checkmarkCircleSharp} />
                                    }

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
            <IonAlert
                isOpen={showAlertOk}
                onDidDismiss={() => setShowAlertOk(false)}
                cssClass='my-custom-class'
                header={'¡Exito!'}
                message={'Se guardo correctamente.'}
                buttons={['Cerrar']}
            />
            <IonAlert
                isOpen={showAlertError}
                onDidDismiss={() => setShowAlertError(false)}
                cssClass='my-custom-class'
                header={'¡Ups!'}
                message={'Ocurrio un error. Intentelo nuevamente.'}
                buttons={['Cerrar']}
            />
            <IonActionSheet
                isOpen={showActionSheet}
                onDidDismiss={() => setShowActionSheet(false)}
                cssClass='my-custom-class'
                buttons={[{
                    text: 'Marcar pagado',
                    icon: checkmarkSharp,
                    handler: () => {
                        marcarPagado()
                    }
                }, {
                    text: 'Eliminar',
                    icon: trashSharp,
                    role: 'destructive',
                    handler: () => {
                        eliminar();
                    }
                }]}
            >
            </IonActionSheet>
</>
    )
}

export default EgresosSegment