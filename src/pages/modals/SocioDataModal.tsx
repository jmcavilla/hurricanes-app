import { IonAlert, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import { closeCircleSharp, saveSharp } from 'ionicons/icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import CuotaSocio from '../../components/CuotaSocio';
import { fetchConToken } from '../../helpers/fetch';
import { getSociosPending, startGetSociosActivos } from '../../store/admin/admin.actions';

const SocioDataModal = ({ socioSelected, close, isPending = false }) => {
    const dispatch = useDispatch();
    const [cuotasSocio, setCuotasSocio] = useState([]);
    const [tipoSocio, setTipoSocio] = useState('');
    const [huboCambio, setHuboCambio] = useState(false);
    const [present, dismiss] = useIonLoading();
    const [showAlertOk, setShowAlertOk] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);
    const [segment, setSegment] = useState('D');

    moment.locale('es');
    const getCuotaSocio = async () => {
        // present();
        const resp = await fetchConToken('cuota/getCuotasBySocio', { socio_id: socioSelected._id }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            setCuotasSocio(body.cuotas);
        }
        // dismiss()
    }

    const guardarSocio = async () => {
        present()
        try {
            socioSelected.tipo_socio = tipoSocio;
            const resp = await fetchConToken('socio/save', { ...socioSelected }, 'PUT');
            const body = await resp.json();

            if (body.ok) {
                dismiss();
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

    const activate = async () => {
        try {
            const res = await fetchConToken('socio/activate', { socio_id: socioSelected._id }, 'POST');
            const body = await res.json()

            if(body.ok){
                dispatch(startGetSociosActivos());
                dispatch(getSociosPending());
                close();
            }else{
                setShowAlertError(true);
            }
        } catch (error) {
            setShowAlertError(true);
        }
    }

    useEffect(() => {
        getCuotaSocio();
        setTipoSocio(socioSelected?.tipo_socio);
    }, [socioSelected])

    return (
        <>
            <IonHeader>
                <IonToolbar color='secondary'>
                    <IonTitle>Datos Socio</IonTitle>
                    <IonButton slot='end' fill='clear' onClick={close}>
                        <IonIcon color='light' icon={closeCircleSharp} style={{ fontSize: '1.8em' }}></IonIcon>
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {!isPending && <IonSegment onIonChange={e => setSegment(e.detail.value)} value={segment}>
                    <IonSegmentButton value="D">
                        <IonLabel>DATOS</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="C">
                        <IonLabel>CUOTAS</IonLabel>
                    </IonSegmentButton>
                </IonSegment>}
                {segment === 'D' && <IonGrid>
                    <IonRow>
                        <IonCol style={{ display: 'flex', justifyContent: 'center' }}>
                            <div className='user__img' style={{ backgroundImage: `url(${socioSelected?.foto})` }}>
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton expand='block' disabled={!huboCambio} onClick={guardarSocio}>
                                <IonLabel className='ion-margin'>GUARDAR</IonLabel> <IonIcon src={saveSharp} />
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        {
                            socioSelected?.numero_socio &&
                            <IonCol size='12'>
                                <IonItem>
                                    <IonLabel position='stacked'>N° Socio</IonLabel>
                                    <IonInput value={socioSelected?.numero_socio} disabled={true}></IonInput>
                                </IonItem>
                            </IonCol>
                        }
                        <IonCol size='12'>
                            <IonItem>
                                <IonLabel position='stacked'>Tipo Socio</IonLabel>
                                {/* <IonInput value={tipoSocio} disabled={true}></IonInput> */}
                                <IonSelect
                                    value={tipoSocio}
                                    okText="Aceptar"
                                    cancelText="Cancelar"
                                    onIonChange={e => {
                                        setTipoSocio(e.detail.value);
                                        if (e.detail.value !== socioSelected.tipo_socio) {
                                            setHuboCambio(true)
                                        } else {
                                            setHuboCambio(false)
                                        }
                                    }}
                                >
                                    <IonSelectOption value='N'>Normal</IonSelectOption>
                                    <IonSelectOption value='J'>Jugador</IonSelectOption>
                                    <IonSelectOption value='X'>Especial</IonSelectOption>
                                    <IonSelectOption value='S'>Staff</IonSelectOption>
                                    <IonSelectOption value='F'>Fundador</IonSelectOption>

                                </IonSelect>
                            </IonItem>
                        </IonCol>
                        <IonCol size='12'>
                            <IonItem>
                                <IonLabel position='stacked'>Nombre</IonLabel>
                                <IonInput value={socioSelected?.nombre} disabled={true}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol size='12'>
                            <IonItem>
                                <IonLabel position='stacked'>Apellido</IonLabel>
                                <IonInput value={socioSelected?.apellido} disabled={true}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonLabel position='stacked'>Fecha de Nacimiento</IonLabel>
                                <IonInput value={socioSelected?.fecha_nac} disabled={true}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonLabel position='stacked'>DNI</IonLabel>
                                <IonInput value={socioSelected?.dni} disabled={true}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol size='12'>
                            <IonItem>
                                <IonLabel position='stacked'>Teléfono</IonLabel>
                                <IonInput value={socioSelected?.telefono} disabled={true}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonLabel position='stacked'>¿Socio de Huracán?</IonLabel>
                                <IonInput value={socioSelected?.socio_huracan ? 'SI' : 'NO'} disabled={true}></IonInput>
                            </IonItem>
                        </IonCol>
                        {
                            socioSelected?.socio_huracan && <IonCol>
                                <IonItem>
                                    <IonLabel position='stacked'>N° Socio Huracán</IonLabel>
                                    <IonInput value={socioSelected?.numero_socio_huracan} disabled={true}></IonInput>
                                </IonItem>
                            </IonCol>
                        }
                    </IonRow>
                    {isPending && 
                    <>
                        <IonButton className='ion-margin-top' color='success' expand='block' onClick={() => { activate() }}>ACEPTAR</IonButton>
                        <IonButton className='ion-margin-top' color='danger' expand='block'>RECHAZAR</IonButton>
                    </>}
                </IonGrid>}
                {segment === 'C' &&
                    cuotasSocio.sort((a, b) => (a.mes < b.mes) ? 1 : ((b.mes < a.mes) ? -1 : 0))
                        .map((cuota, i) => (
                            <CuotaSocio key={i} cuota={cuota} getCuotaSocio={() => getCuotaSocio()} />
                        ))
                }
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
                isOpen={showAlertError}
                onDidDismiss={() => setShowAlertError(false)}
                cssClass='my-custom-class'
                header={'¡Ups!'}
                message={'Ocurrio un error. Intentelo nuevamente.'}
                buttons={['Cerrar']}
            />
        </>
    )
}

export default SocioDataModal