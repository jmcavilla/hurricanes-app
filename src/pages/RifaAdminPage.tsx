import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonItem, IonLabel, IonModal, IonRow, IonSegment, IonSegmentButton } from '@ionic/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store';
import { startGetTicketsAccepted, startGetTicketsRifa } from '../store/admin/admin.actions';
import RifaDataModal from './modals/RifaDataModal';

const RifaAdminPage = () => {
    const { rifa, ticketsAccepted, ticketsPending } = useSelector((state: RootState) => state.admin);
    const [segment, setSegment] = useState('P');
    const [taked, setTaked] = useState(0);
    const [showModalPending, setShowModalPending] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startGetTicketsRifa(rifa));
        dispatch(startGetTicketsAccepted(rifa._id));
    }, [])

    useEffect(() => {
        let acceptedNum = 0;
        let pendingNum = 0;
        ticketsAccepted.forEach( tik => {
            acceptedNum += tik.numeros.length;
        })
        ticketsPending.forEach( tok => {
            pendingNum += tok.numeros.length;
        })
        setTaked(acceptedNum + pendingNum);
    }, [ticketsAccepted, ticketsPending])

    return (
        <>
            <IonRow>
                <IonCol size='6'>
                    <IonCard className='ion-text-center' color='primary'>
                        <IonCardHeader><strong>NUMEROS TOMADOS</strong></IonCardHeader>
                        <IonCardContent>{taked}</IonCardContent>
                    </IonCard>
                </IonCol>
                <IonCol size='6'>
                    <IonCard className='ion-text-center' color='secondary'>
                        <IonCardHeader><strong>TOTAL RECAUDADO</strong></IonCardHeader>
                        <IonCardContent>{taked * rifa.value}</IonCardContent>
                    </IonCard>
                </IonCol>
            </IonRow>
            <IonSegment onIonChange={e => setSegment(e.detail.value)} value={segment}>
                <IonSegmentButton value="P">
                    {segment === 'P' ? <IonLabel color='secondary'><strong>PENDIENTES</strong></IonLabel> : <IonLabel>PENDIENTES</IonLabel>}
                </IonSegmentButton>
                <IonSegmentButton value="A">
                    {segment === 'A' ? <IonLabel color='secondary'><strong>ACEPTADOS</strong></IonLabel> : <IonLabel>ACEPTADOS</IonLabel>}
                </IonSegmentButton>
            </IonSegment>
            {
                segment === "P" && ticketsPending && ticketsPending.length > 0 && ticketsPending.map((ticket, i) => (
                    <IonItem key={i} lines="full">
                        <IonLabel>{ticket.name} - {
                            ticket.numeros.map(num => `D${num.numero}, `)
                        } - ${ticket.numeros.length * rifa.value}</IonLabel>
                        <IonButton fill='clear' color='primary' onClick={() => {
                            setSelected(ticket);
                            setShowModalPending(true);
                        }}>VER</IonButton>
                    </IonItem>
                ))
            }
            {
                segment === "A" && ticketsAccepted && ticketsAccepted.length > 0 && ticketsAccepted.map((ticket, i) => (
                    <IonItem key={i} lines="full">
                        <IonLabel>{ticket.name} - {
                            ticket.numeros.map(num => `D${num.numero}, `)
                        } - ${ticket.numeros.length * rifa.value}</IonLabel>
                        <IonButton fill='clear' color='primary' onClick={() => {
                            setSelected(ticket);
                            setShowModal(true);
                        }}>VER</IonButton>
                    </IonItem>
                ))
            }
            {
                segment === 'P' && ticketsPending && ticketsPending.length === 0 &&
                <>
                    <IonItem lines="none" disabled={true}>
                        <IonLabel>No se encontraron rifas pendientes.</IonLabel>
                        {/* <IonButton fill='clear' color='primary'>VER DATOS</IonButton> */}
                    </IonItem>
                </>
            }
            <IonModal isOpen={showModalPending} onIonModalDidDismiss={() => { setShowModalPending(false) }}>
                <RifaDataModal isPending={true} ticket={selected} close={() => { setShowModalPending(false); setSelected(null); }}/>
            </IonModal>
            <IonModal isOpen={showModal} onIonModalDidDismiss={() => { setShowModal(false) }}>
                <RifaDataModal ticket={selected} close={() => { setShowModal(false); setSelected(null); }}/>
            </IonModal>
        </>
    )
}

export default RifaAdminPage