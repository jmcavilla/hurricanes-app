import React from 'react'
import { IonCard, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonGrid, IonIcon, IonLabel, IonList, IonModal, IonPage, IonRow, IonSegment, IonSegmentButton, IonSpinner } from '@ionic/react'
import EgresosSegment from '../components/EgresosSegment';
import IngresosSegment from '../components/IngresosSegment';
import { addCircleOutline, chevronUpCircleSharp, removeCircleOutline } from 'ionicons/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useEffect, useState } from 'react'
import ModalIngreso from '../components/modals/ModalIngreso';
import moment from 'moment';

const ContablePage = () => {
    const { ingresos, egresos, ingresosCount, egresosCount } = useSelector((state: RootState) => state.admin);
    const [segment, setSegment] = useState('I');
    const [ingCuotas, setIngCuotas] = useState(0);
    const [ingRopa, setIngRopa] = useState(0);
    const [ingOtro, setIngOtro] = useState(0);
    const [showModalIngreso, setShowModalIngreso] = useState(false);
    const [ingMes, setIngMes] = useState(0);
    const [egrMes, setEgrMes] = useState(0);
    const [tipo, setTipo] = useState('')
    const showNewIngreso = (tipo) => {
        setTipo(tipo)
        setShowModalIngreso(true);
    }

    useEffect(() => {
        let cuotas = 0;
        let ropa = 0;
        let otro = 0;
        let ingMesActual = 0;
        let egrMesActual = 0;
        for (let index = 0; index < ingresos.length; index++) {
            const ing = ingresos[index];
            if((moment().year()) === ing.anio){
                if((moment().month()+1) === ing.mes){
                    if( ing.motivo && ing.motivo === 'CUOTA'){
                        cuotas = (cuotas + ing.monto);
                    }
                    if( ing.motivo && ing.motivo === 'ROPA'){
                        ropa = (ropa + ing.monto);
                    }
                    if( ing.motivo && ing.motivo === 'OTRO'){
                        otro = (otro + ing.monto);
                    }
                    ingMesActual += ing.monto;
                }
            }
        }

        for (let index = 0; index < egresos.length; index++) {
            const egr = egresos[index];
            if((moment().year()) === egr.anio){
                if((moment().month()+1) === egr.mes){
                    egrMesActual += egr.monto;
                }
            }
        }

        setIngCuotas(cuotas);
        setIngRopa(ropa);
        setIngOtro(otro);
        setIngMes(ingMesActual);
        setEgrMes(egrMesActual);
        // ingresos.forEach((ing) => {
        //     console.log(ing)
        //     if( ing.motivo && ing.motivo === 'CUOTA'){
        //         cuotas = (ingCuotas + ing.monto);
        //     }
        //     if( ing.motivo && ing.motivo === 'ROPA'){
        //         ropa = (ingRopa + ing.monto);
        //     }
        // })

    }, [ingresos])
    
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
                                        border: '3px solid var(--ion-color-secondary)',
                                        margin: '0 10px',
                                        padding: '5px'
                                    }} className='ion-text-center ion-padding' color=''>
                                        <IonCardSubtitle>TOTAL DISPONIBLE</IonCardSubtitle>
                                        <IonCardTitle>${ingresosCount - egresosCount}</IonCardTitle>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol size='12'>
                                    <IonCard style={{
                                        border: `3px solid var( ${ ingMes - egrMes > 0 ? '--ion-color-success' : '--ion-color-danger'})`,
                                        margin: '0 10px'
                                    }} className='ion-text-center' color=''>
                                        <IonCardSubtitle>ESTADO MENSUAL</IonCardSubtitle>
                                        <IonCardTitle>${ingMes - egrMes}</IonCardTitle>
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
                                        <>
                                        <IonRow>
                                            <IonCol size='12'>
                                                <IonCard className='ion-text-center ion-padding' color='success' style={{ margin: '0',
                                        padding: '10px' }}>
                                                    <IonCardSubtitle color='dark'>INGRESOS</IonCardSubtitle>
                                                    <IonCardTitle color='dark'>${ingresosCount}</IonCardTitle>
                                                </IonCard>
                                            </IonCol>
                                            <IonCol size='4'>
                                                <IonCard style={{
                                                    border: '3px solid var(--ion-color-primary)',
                                                    margin: '0'
                                                }} className='ion-text-center ion-padding' color=''>
                                                    <IonCardSubtitle>ROPA</IonCardSubtitle>
                                                    <IonCardSubtitle>${ingRopa}</IonCardSubtitle>
                                                </IonCard>
                                            </IonCol>
                                            <IonCol size='4'>
                                                <IonCard style={{
                                                    border: '3px solid var(--ion-color-secondary)',
                                                    margin: '0'
                                                }} className='ion-text-center ion-padding' color=''>
                                                    <IonCardSubtitle>CUOTAS</IonCardSubtitle>
                                                    <IonCardSubtitle>${ingCuotas}</IonCardSubtitle>
                                                </IonCard>
                                            </IonCol>
                                            <IonCol size='4'>
                                                <IonCard style={{
                                                    border: '3px solid var(--ion-color-tertiary)',
                                                    margin: '0'
                                                }} className='ion-text-center ion-padding' color=''>
                                                    <IonCardSubtitle>OTRO</IonCardSubtitle>
                                                    <IonCardSubtitle>${ingOtro}</IonCardSubtitle>
                                                </IonCard>
                                            </IonCol>
                                            <IonCol size='12'>
                                                <IngresosSegment />

                                            </IonCol>
                                        </IonRow>
                                        </>
                                        :
                                        <IonCol size='12'>
                                            <IonCard className='ion-text-center ion-padding' color='danger' style={{ margin: '0',
                                        padding: '10px' }}>
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