import { IonAlert, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import { closeCircleSharp, saveSharp } from 'ionicons/icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CuotaSocio from '../../components/CuotaSocio';
import { fetchConToken } from '../../helpers/fetch';
import { RootState } from '../../store';
import { getSociosPending, startGetSociosActivos } from '../../store/admin/admin.actions';

const SocioDataModal = ({ socioSelected, close, isPending = false }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.user);
    const [socioSel, setSocioSel] = useState(socioSelected)
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
        const resp = await fetchConToken('cuota/getCuotasBySocio', { socio_id: socioSel._id }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            setCuotasSocio(body.cuotas);
        }
        // dismiss()
    }

    const guardarSocio = async () => {
        if(socioSel.socio_huracan && (!socioSel.numero_socio_huracan || socioSel.numero_socio_huracan === 0)){
            setShowAlertError(true);
            return;
        }
        present()
        try {
            socioSel.tipo_socio = tipoSocio;
            const resp = await fetchConToken('socio/save', { ...socioSel }, 'PUT');
            const body = await resp.json();

            if (body.ok) {
                dismiss();
                setShowAlertOk(true);
                dispatch(startGetSociosActivos());
                dispatch(getSociosPending());
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
            const res = await fetchConToken('socio/activate', { socio_id: socioSel._id }, 'POST');
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
        setTipoSocio(socioSel?.tipo_socio);
    }, [socioSel])

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
                            <div className='user__img' style={{ backgroundImage: `url(${socioSel?.foto})` }}>
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
                            socioSel?.numero_socio &&
                            <IonCol size='12'>
                                <IonItem>
                                    <IonLabel position='stacked'>N° Socio</IonLabel>
                                    <IonInput value={socioSel?.numero_socio} disabled={true} ></IonInput>
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
                                        if (e.detail.value !== socioSel.tipo_socio) {
                                            setHuboCambio(true)
                                        } else {
                                            setHuboCambio(false)
                                        }
                                    }}
                                >
                                    <IonSelectOption value='N'>Normal</IonSelectOption>
                                    <IonSelectOption value='J'>Jugador</IonSelectOption>
                                    <IonSelectOption value='P'>Padre/Madre</IonSelectOption>
                                    <IonSelectOption value='X'>Especial</IonSelectOption>
                                    <IonSelectOption value='S'>Staff</IonSelectOption>
                                    <IonSelectOption value='F'>Fundador</IonSelectOption>

                                </IonSelect>
                            </IonItem>
                        </IonCol>
                        <IonCol size='12'>
                            <IonItem>
                                <IonLabel position='stacked'>Nombre</IonLabel>
                                <IonInput value={socioSel?.nombre} disabled={!user.admin} onIonChange={e => { setSocioSel({
                                        ...socioSel,
                                        nombre: e.detail.value
                                    })
                                    }}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol size='12'>
                            <IonItem>
                                <IonLabel position='stacked'>Apellido</IonLabel>
                                <IonInput value={socioSel?.apellido} disabled={!user.admin} onIonChange={e => { setSocioSel({
                                        ...socioSel,
                                        apellido: e.detail.value
                                    })
                                    }}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonLabel position='stacked'>Fecha de Nacimiento</IonLabel>
                                <IonInput value={socioSel?.fecha_nac} disabled={!user.admin} onIonChange={e => { setSocioSel({
                                        ...socioSel,
                                        fecha_nac: e.detail.value
                                    })
                                    }}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonLabel position='stacked'>DNI</IonLabel>
                                <IonInput type='number' value={socioSel?.dni} disabled={!user.admin} onIonChange={e => { setSocioSel({
                                        ...socioSel,
                                        dni: e.detail.value
                                    })
                                    }}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol size='12'>
                            <IonItem>
                                <IonLabel position='stacked'>Teléfono</IonLabel>
                                <IonInput type='tel' value={socioSel?.telefono} onIonChange={e => {
                                    setHuboCambio(true);
                                    setSocioSel({
                                        ...socioSel,
                                        telefono: e.detail.value
                                    })
                                }} disabled={!user.admin}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonLabel position='stacked'>¿Socio de Huracán?</IonLabel>
                                {/* <IonInput value={socioSel?.socio_huracan ? 'SI' : 'NO'} disabled={!user.admin}></IonInput> */}
                                <IonSelect
                                    value={socioSel?.socio_huracan}
                                    okText="Aceptar"
                                    cancelText="Cancelar"
                                    disabled={!user.admin}
                                    onIonChange={e => {
                                        setHuboCambio(true);
                                        setSocioSel({
                                            ...socioSel,
                                            socio_huracan: e.detail.value
                                        })
                                    }}
                                >
                                    <IonSelectOption value={true}>SI</IonSelectOption>
                                    <IonSelectOption value={false}>NO</IonSelectOption>

                                </IonSelect>
                            </IonItem>
                        </IonCol>
                        {
                            socioSel?.socio_huracan && <IonCol>
                                <IonItem>
                                    <IonLabel position='stacked'>N° Socio Huracán</IonLabel>
                                    <IonInput type='number' value={socioSel?.numero_socio_huracan} disabled={!user.admin}onIonChange={e => {
                                    setHuboCambio(true);
                                    setSocioSel({
                                        ...socioSel,
                                        numero_socio_huracan: e.detail.value
                                    })
                                }}></IonInput>
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
                            <CuotaSocio key={i} cuota={cuota} getCuotaSocio={() => getCuotaSocio()} socio={socioSel}/>
                        ))
                }
            </IonContent>
            <IonAlert
                isOpen={showAlertOk}
                onDidDismiss={() => {setShowAlertOk(false); close()}}
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