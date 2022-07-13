import { IonButton, IonCard, IonCardContent, IonSearchbar, IonCardHeader, IonCol, IonItem, IonLabel, IonModal, IonRow, IonSegment, IonSegmentButton, IonSpinner, IonSelect, IonSelectOption, IonFab, IonFabButton, IonIcon, IonList } from '@ionic/react';
import { addCircleOutline } from 'ionicons/icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchConToken } from '../helpers/fetch';
import { RootState } from '../store';
import { getSociosPending, startGetSociosActivos } from '../store/admin/admin.actions';
import { uiHideFieldsSocioAdmin, uiShowFieldsSocioAdmin } from '../store/ui/ui.actions';
import SocioDataModal from './modals/SocioDataModal';
import SocioSlides from './slides/SocioSlides';

const SociosPage = () => {
    const { sociosActivos, sociosPendientes } = useSelector((state: RootState) => state.admin);
    const { showFieldsSocioAdmin } = useSelector((state: RootState) => state.ui);
    const [segment, setSegment] = useState('A');
    const [showModal, setShowModal] = useState(false);
    const [showModalPending, setShowModalPending] = useState(false);
    const [selected, setSelected] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [sociosTable, setSociosTable] = useState([]);
    const [showAddSocio, setShowAddSocio] = useState(false)
    const [month, setMonth] = useState(moment().month() + 1)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startGetSociosActivos());
        dispatch(getSociosPending());
    }, [])

    useEffect(() => {
        setSociosTable([...sociosActivos.filter(socio =>
        (socio.numero_socio.includes(searchText) ||
            socio.nombre.includes(searchText) ||
            socio.apellido.includes(searchText) ||
            socio.dni.includes(searchText))
        )])
    }, [searchText, sociosActivos])

    const generateCuotas = async () => {
        try {
            const resp = await fetchConToken('cuota/generarCuotasMes', { mes: month }, 'POST');
            const body = await resp.json();

            if (body.ok) {
            }

        } catch (error) {

        } finally {
        }
    }

    return (
        <>
            <IonRow>
                <IonCol size='6'>
                    <IonCard className='ion-text-center' color='primary'>
                        <IonCardHeader><strong>Pendientes</strong></IonCardHeader>
                        <IonCardContent style={{ fontSize: '5vw'}}>
                            {sociosPendientes.length}
                        </IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol size='6'>
                    <IonCard className='ion-text-center' color='secondary' style={{ minHeight: '9vh'}}>
                        <>
                            <IonCardHeader><strong>Activos</strong></IonCardHeader>
                            <IonCardContent style={{ fontSize: '5vw'}}>
                                {sociosActivos.length ? sociosActivos.length : <IonSpinner color='light' name="crescent" />}
                            </IonCardContent>
                        </>
                    </IonCard>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol size='12'>
                    <IonItem>
                        <IonLabel>Mes a generar</IonLabel>
                        <IonSelect value={month} okText="Aceptar" cancelText="Cancelar" onIonChange={e => setMonth(e.detail.value)}>
                            <IonSelectOption value={1}>Enero {moment().year()}</IonSelectOption>
                            <IonSelectOption value={2}>Febrero {moment().year()}</IonSelectOption>
                            <IonSelectOption value={3}>Marzo {moment().year()}</IonSelectOption>
                            <IonSelectOption value={4}>Abril {moment().year()}</IonSelectOption>
                            <IonSelectOption value={5}>Mayo {moment().year()}</IonSelectOption>
                            <IonSelectOption value={6}>Junio {moment().year()}</IonSelectOption>
                            <IonSelectOption value={7}>Julio {moment().year()}</IonSelectOption>
                            <IonSelectOption value={8}>Agosto {moment().year()}</IonSelectOption>
                            <IonSelectOption value={9}>Septiembre {moment().year()}</IonSelectOption>
                            <IonSelectOption value={10}>Octubre {moment().year()}</IonSelectOption>
                            <IonSelectOption value={11}>Noviembre {moment().year()}</IonSelectOption>
                            <IonSelectOption value={12}>Diciembre {moment().year()}</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                </IonCol>
                <IonCol size='12'>
                    <IonButton expand='block' onClick={generateCuotas} >GENERAR CUOTAS PARA MES</IonButton>
                </IonCol>
            </IonRow>
            <IonSegment onIonChange={e => setSegment(e.detail.value)} value={segment}>
                <IonSegmentButton value="A">
                    {segment === 'A' ? <IonLabel color='secondary'><strong>ACTIVOS</strong></IonLabel> : <IonLabel>ACTIVOS</IonLabel>}
                </IonSegmentButton>
                <IonSegmentButton value="P">
                    {segment === 'P' ? <IonLabel color='secondary'><strong>PENDIENTES</strong></IonLabel> : <IonLabel>PENDIENTES</IonLabel>}
                </IonSegmentButton>
            </IonSegment>
            {
                segment === 'A' &&
                <>
                    <IonRow>
                        <IonCol size='12'>
                            <IonSearchbar value={searchText} placeholder="Buscar socio" onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
                        </IonCol>
                    </IonRow>
                </>
            }
            {
                segment === 'A' && <IonList style={{ marginBottom: '10vh'}}>
                    {
                        sociosTable && sociosTable.length > 0 && sociosTable.map((socio, i) => (
                        
                            <IonItem key={i} lines="full">
                                <IonLabel>{
                                    `${socio?.numero_socio && ('0000' + socio?.numero_socio).slice(-4)} - ${socio.apellido}, ${socio.nombre}`
                                }</IonLabel>
                                <IonButton fill='clear' color='primary' onClick={() => {
                                    setSelected(socio);
                                    setShowModal(true);
                                }}>VER</IonButton>
                            </IonItem>
                        
                        ))
                    }
                </IonList>
            }
            {
                segment === 'P' && sociosPendientes && sociosPendientes.length > 0 && sociosPendientes.map((socio, i) => (
                    <IonItem key={i} lines="full">
                        <IonLabel>{
                            `${socio.apellido}, ${socio.nombre}`
                        }</IonLabel>
                        <IonButton fill='clear' color='primary' onClick={() => {
                            setSelected(socio);
                            setShowModalPending(true);
                        }}>VER</IonButton>
                    </IonItem>
                ))
            }
            {
                segment === 'A' && sociosTable && sociosTable.length === 0 &&
                <>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <IonSpinner color='secondary' name="crescent" />
                    </div>
                </>
            }
            {
                segment === 'P' && sociosPendientes && sociosPendientes.length === 0 &&
                <>
                    <IonItem lines="none" disabled={true}>
                        <IonLabel>No se encontraron socios pendientes.</IonLabel>
                        {/* <IonButton fill='clear' color='primary'>VER DATOS</IonButton> */}
                    </IonItem>
                </>
            }
            <IonModal isOpen={showModal} onIonModalDidDismiss={() => { setShowModal(false) }}>
                <SocioDataModal socioSelected={selected} close={() => { setShowModal(false); setSelected(null); }} />
            </IonModal>
            <IonModal isOpen={showModalPending} onIonModalDidDismiss={() => { setShowModalPending(false) }}>
                <SocioDataModal isPending={true} socioSelected={selected} close={() => { setShowModalPending(false); setSelected(null); }} />
            </IonModal>
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton color='secondary' onClick={() => {
                    dispatch(uiShowFieldsSocioAdmin())
                }}>
                    <IonIcon size='large' icon={addCircleOutline} />
                </IonFabButton>
            </IonFab>
            <IonModal isOpen={showFieldsSocioAdmin}>
                <SocioSlides admin={true} close={() => {
                    dispatch(uiHideFieldsSocioAdmin())
                }}></SocioSlides>
            </IonModal>
        </>
    )
}

export default SociosPage