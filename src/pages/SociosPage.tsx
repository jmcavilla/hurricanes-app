import { IonButton, IonCard, IonCardContent, IonSearchbar, IonCardHeader, IonCol, IonItem, IonLabel, IonModal, IonRow, IonSegment, IonSegmentButton } from '@ionic/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store';
import { getSociosPending, startGetSociosActivos } from '../store/admin/admin.actions';
import SocioDataModal from './modals/SocioDataModal';

const SociosPage = () => {
    const { sociosActivos, sociosPendientes } = useSelector((state: RootState) => state.admin);
    const [segment, setSegment] = useState('A');
    const [showModal, setShowModal] = useState(false);
    const [showModalPending, setShowModalPending] = useState(false);
    const [selected, setSelected] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [sociosTable, setSociosTable] = useState([]);

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

    return (
        <>
            <IonRow>
                <IonCol size='6'>
                    <IonCard className='ion-text-center' color='primary'>
                        <IonCardHeader><strong>Pendientes</strong></IonCardHeader>
                        <IonCardContent>{sociosPendientes.length}</IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol size='6'>
                    <IonCard className='ion-text-center' color='secondary'>
                        <IonCardHeader><strong>Activos</strong></IonCardHeader>
                        <IonCardContent>{sociosActivos.length}</IonCardContent>
                    </IonCard>
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
                segment === 'A' && sociosTable && sociosTable.length > 0 && sociosTable.map((socio, i) => (
                    <>

                        <IonItem key={i} lines="full">
                            <IonLabel>{
                                `${socio?.numero_socio && ('0000' + socio?.numero_socio).slice(-4)} - ${socio.apellido}, ${socio.nombre}`
                            }</IonLabel>
                            <IonButton fill='clear' color='primary' onClick={() => {
                                setSelected(socio);
                                setShowModal(true);
                            }}>VER</IonButton>
                        </IonItem>
                    </>
                ))
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
        </>
    )
}

export default SociosPage