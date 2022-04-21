import { IonAlert, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonRow, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import { closeCircleSharp, saveSharp } from 'ionicons/icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CuotaSocio from '../../components/CuotaSocio';
import { fetchConToken } from '../../helpers/fetch';
import { RootState } from '../../store';
import { startGetTicketsAccepted, startGetTicketsRifa } from '../../store/admin/admin.actions';

const RifaDataModal = ({ ticket, close, isPending = false }) => {
    const { rifa } = useSelector((state: RootState) => state.admin);

    const [present, dismiss] = useIonLoading();
    const [showAlertOk, setShowAlertOk] = useState(false);
    const dispatch = useDispatch();

    moment.locale('es');
    

    const aprove = async (id_ticket) => {
        present();
        try {
            const resp = await fetchConToken('rifa/aprove', { id_ticket }, 'POST');
            const body = await resp.json();

            if(body.ok){
                dismiss();
                dispatch(startGetTicketsAccepted(rifa._id));
                dispatch(startGetTicketsRifa(rifa));
                close()
            }else{
                dismiss();

            }
        } catch (error) {
            dismiss();

        }
    }

    const reject = async (id_ticket) => {
        present();
        try {
            const resp = await fetchConToken('rifa/reject', { id_ticket }, 'POST');
            const body = await resp.json();

            if(body.ok){
                dismiss();
                dispatch(startGetTicketsAccepted(rifa._id));
                dispatch(startGetTicketsRifa(rifa));
                close()

            }else{
                dismiss();
            }
        } catch (error) {
            dismiss();
            
        }
    }


    useEffect(() => {
    }, [ticket])

    return (
        <>
            <IonHeader>
                <IonToolbar color='secondary'>
                    <IonTitle>Datos Ticket</IonTitle>
                    <IonButton slot='end' fill='clear' onClick={close}>
                        <IonIcon color='light' icon={closeCircleSharp} style={{ fontSize: '1.8em' }}></IonIcon>
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol style={{ display: 'flex', justifyContent: 'center' }}>
                            <IonImg src={ticket?.comprobante} style={{ height: '50vh'}}/>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        {ticket?.numeros && ticket?.numeros.length > 0 && <IonCol size='12'>
                            <IonItem>
                                <IonLabel position='stacked'>Debió Pagar</IonLabel>
                                <IonInput value={`$${ticket?.numeros?.length * rifa.value}`} disabled={true}></IonInput>
                            </IonItem>
                        </IonCol>}
                        <IonCol size='12'>
                            <IonItem>
                                <IonLabel position='stacked'>Nombre</IonLabel>
                                <IonInput value={ticket?.name} disabled={true}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol size='12'>
                            <IonItem>
                                <IonLabel position='stacked'>Email</IonLabel>
                                <IonInput value={ticket?.email} disabled={true}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol size='12'>
                            <IonItem>
                                <IonLabel position='stacked'>Telefono</IonLabel>
                                <IonInput value={ticket?.tel} disabled={true}></IonInput>
                            </IonItem>
                        </IonCol>
                        {ticket?.numeros && ticket?.numeros.length > 0 && <IonCol size='12'>
                            <IonItem>
                                <IonLabel position='stacked'>Numeros</IonLabel>
                                <IonInput value={`${ticket.numeros?.map(num => `D${num.numero}, `)}`} disabled={true}></IonInput>
                            </IonItem>
                        </IonCol>}
                    </IonRow>
                    {
                    isPending && <>
                        <IonButton className='ion-margin-top' expand='block' fill='solid' color='success' onClick={() => {
                            aprove(ticket._id);
                        }}><strong>ACEPTAR</strong></IonButton>
                        {/* <IonButton className='ion-margin-top' expand='block' fill='solid' color='danger' onClick={() => {
                            reject(ticket._id)
                        }}><strong>RECHAZAR</strong></IonButton> */}
                    </>
                    }
                </IonGrid>

            </IonContent>
            <IonAlert
                isOpen={showAlertOk}
                onDidDismiss={() => setShowAlertOk(false)}
                cssClass='my-custom-class'
                header={'¡Exito!'}
                message={'Se guardo correctamente.'}
                buttons={['Cerrar']}
            />
            <IonAlert
                isOpen={showAlertOk}
                onDidDismiss={() => setShowAlertOk(false)}
                cssClass='my-custom-class'
                header={'¡Ups!'}
                message={'Ocurrio un error. Intentelo nuevamente.'}
                buttons={['Cerrar']}
            />
        </>
    )
}

export default RifaDataModal