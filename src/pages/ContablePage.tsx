import React from 'react'
import { IonCard, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonGrid, IonIcon, IonLabel, IonList, IonModal, IonPage, IonRow, IonSegment, IonSegmentButton, IonSpinner } from '@ionic/react'
import EgresosSegment from '../components/EgresosSegment';
import IngresosSegment from '../components/IngresosSegment';
import { addCircleOutline, chevronUpCircleSharp, removeCircleOutline } from 'ionicons/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useEffect, useState } from 'react'
import ModalIngreso from '../components/modals/ModalIngreso';

const ContablePage = () => {
    const { ingresos, egresos, ingresosCount, egresosCount } = useSelector((state: RootState) => state.admin);
    const [segment, setSegment] = useState('I');
    const [showModalIngreso, setShowModalIngreso] = useState(false)
    const [tipo, setTipo] = useState('')
    const showNewIngreso = (tipo) => {
        setTipo(tipo)
        setShowModalIngreso(true);
    }
    return (
        <>
            {
                ingresos && egresos
                    ?
                    <>
                        <IonGrid>
                            <IonRow>
                                <IonCol size='12'>
                                    <IonCard style={{
                                        border: '3px solid var(--ion-color-secondary)'
                                    }} className='ion-text-center ion-padding' color='medium'>
                                        <IonCardSubtitle>TOTAL DISPONIBLE</IonCardSubtitle>
                                        <IonCardTitle>${ingresosCount - egresosCount}</IonCardTitle>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonSegment onIonChange={e => setSegment(e.detail.value)} value={segment}>
                                    <IonSegmentButton value="I">
                                        {/* <IonLabel>Ingresos</IonLabel> */}
                                        {segment === 'I' ? <IonLabel color='success'><strong>INGRESOS</strong></IonLabel> : <IonLabel>INGRESOS</IonLabel>}
                                    </IonSegmentButton>
                                    <IonSegmentButton value="O">
                                        {segment === 'O' ? <IonLabel color='danger'><strong>EGRESOS</strong></IonLabel> : <IonLabel>EGRESOS</IonLabel>}
                                    </IonSegmentButton>
                                </IonSegment>
                                {
                                    segment === 'I' ?
                                        <IonCol size='12'>
                                            <IonCard className='ion-text-center ion-padding' color='success'>
                                                <IonCardSubtitle color='dark'>INGRESOS</IonCardSubtitle>
                                                <IonCardTitle color='dark'>${ingresosCount}</IonCardTitle>
                                            </IonCard>
                                            <IngresosSegment />
                                        </IonCol>
                                        :
                                        <IonCol size='12'>
                                            <IonCard className='ion-text-center ion-padding' color='danger'>
                                                <IonCardSubtitle>EGRESOS</IonCardSubtitle>
                                                <IonCardTitle>${egresosCount}</IonCardTitle>
                                            </IonCard>
                                            <EgresosSegment />
                                        </IonCol>
                                }
                            </IonRow>
                        </IonGrid>
                        <IonFab vertical="bottom" horizontal="end" slot="fixed">
                            <IonFabButton color='secondary'>
                                <IonIcon size='large' icon={chevronUpCircleSharp} />
                            </IonFabButton>
                            <IonFabList side="top">
                                <IonFabButton color='success' onClick={() => showNewIngreso('Ingreso')}>
                                    <IonIcon size='large' color='dark' icon={addCircleOutline} />
                                </IonFabButton>
                                <IonFabButton color='danger' onClick={() => showNewIngreso('Egreso')}><IonIcon size='large' icon={removeCircleOutline} /></IonFabButton>
                            </IonFabList>
                        </IonFab>
                    </>
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
            <IonModal isOpen={showModalIngreso}>
                <ModalIngreso tipo={tipo} hide={() => setShowModalIngreso(false)} />
            </IonModal>
        </>
    )
}

export default ContablePage