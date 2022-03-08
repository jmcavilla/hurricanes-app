import { IonButton, IonCard, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonModal, IonPage, IonProgressBar, IonRow, IonSpinner } from '@ionic/react'
import { addCircleOutline, addSharp, checkmarkCircleSharp, chevronUp, chevronUpCircleSharp, closeCircleSharp, logoFacebook, logoVimeo, removeCircleOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ModalIngreso from '../../components/modals/ModalIngreso';
import { RootState } from '../../store';
import { startGetEgresos, startGetIngresos } from '../../store/admin/admin.actions';

const TabAdmin = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.user);
    const { ingresos, egresos, ingresosCount, egresosCount } = useSelector((state: RootState) => state.admin);
    const [showModalIngreso, setShowModalIngreso] = useState(false)
    const [tipo, setTipo] = useState('')

    useEffect(() => {
        dispatch(startGetIngresos());
        dispatch(startGetEgresos());
    }, [])

    const showNewIngreso = (tipo) => {
        setTipo(tipo)
        setShowModalIngreso(true);
    }

    return (
        <IonPage>
            <IonContent>
                {
                    !user
                        ?
                        <h3>Si llegaste hasta aca, algo no está bien.</h3>
                        :
                        <>
                        
                            {
                            ingresos && egresos
                            ?
                            <>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size='12'>
                                            <IonCard className='ion-text-center ion-padding' color='medium'>
                                                <IonCardSubtitle>TOTAL NETO</IonCardSubtitle>
                                                <IonCardTitle>${ingresosCount - egresosCount}</IonCardTitle>
                                            </IonCard>
                                        </IonCol>
                                        <IonCol size='6'>
                                            <IonCard className='ion-text-center ion-padding' color='success'>
                                                <IonCardSubtitle color='dark'>INGRESOS</IonCardSubtitle>
                                                <IonCardTitle color='dark'>${ingresosCount}</IonCardTitle>
                                            </IonCard>
                                        </IonCol>
                                        <IonCol size='6'>
                                            <IonCard className='ion-text-center ion-padding' color='danger'>
                                                <IonCardSubtitle>EGRESOS</IonCardSubtitle>
                                                <IonCardTitle>${egresosCount}</IonCardTitle>
                                            </IonCard>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        
                                            <>
                                                <IonCol size='6'>
                                                    {
                                                        ingresos?.map((ingreso, i) => (
                                                            <IonList>
                                                                <IonCard autoCapitalize='true' className='ion-text-center'>
                                                                    <IonLabel>{ingreso.concepto.toUpperCase()}</IonLabel>
                                                                    <IonCardTitle>${ingreso.monto}</IonCardTitle>
                                                                    {ingreso.quien}<br />
                                                                    {ingreso.fecha}
                                                                </IonCard>
                                                            </IonList>
                                                        ))
                                                    }
                                                </IonCol>
                                                <IonCol size='6'>
                                                    {
                                                        egresos?.map((egreso, i) => (
                                                            // <IonList>
                                                            //     <IonItem autoCapitalize='true'>
                                                            //         {egreso.concepto.toUpperCase()}<br /> 
                                                            //         ${egreso.monto}<br /> 
                                                            //         {egreso.quien}<br /> 
                                                            //         {egreso.fecha} <br />
                                                            //         <IonChip color={ egreso.pago === 'Pending' ? 'danger' : 'success' }>
                                                            //             <IonIcon size='large' src={ egreso.pago === 'Pending' ? closeCircleSharp : checkmarkCircleSharp }/>
                                                            //         </IonChip>
                                                            //     </IonItem>
                                                            // </IonList>
                                                            <IonList>
                                                                <IonCard autoCapitalize='true' className='ion-text-center'>
                                                                    <IonLabel>{egreso.concepto.toUpperCase()}</IonLabel>
                                                                    <IonCardTitle>${egreso.monto} </IonCardTitle>
                                                                    {egreso.quien}<br /> 
                                                                    {egreso.fecha} <br />
                                                                    <IonChip color={ egreso.pago === 'Pending' ? 'danger' : 'success' }>
                                                                        <IonLabel >
                                                                            { egreso.pago === 'Pending' ? 'No pago' : 'Pagado' }
                                                                        </IonLabel>
                                                                    </IonChip>
                                                                </IonCard>
                                                            </IonList>
                                                        ))
                                                    }
                                                </IonCol>
                                            </>
                                    </IonRow>
                                </IonGrid>
                                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                                    <IonFabButton color='secondary'>
                                        <IonIcon size='large' icon={chevronUpCircleSharp} />
                                    </IonFabButton>
                                    <IonFabList side="top">
                                        <IonFabButton color='success' onClick={() => showNewIngreso('Ingreso')}><IonIcon size='large' color='dark' icon={addCircleOutline} /></IonFabButton>
                                        <IonFabButton color='danger' onClick={() => showNewIngreso('Egreso')}><IonIcon size='large' icon={removeCircleOutline} /></IonFabButton>
                                    </IonFabList>
                                </IonFab>
                            </>
                            :
                                <div style={{
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent:'center',
                                    alignItems: 'center'
                                }}>
                                    <IonSpinner color='secondary' name="crescent" />
                                </div>
                            }
                            
                            <IonModal isOpen={showModalIngreso}>
                                <ModalIngreso tipo={tipo} hide={() => setShowModalIngreso(false)}/>
                            </IonModal>
                        </>
                }
            </IonContent>
        </IonPage>
    )
}

export default TabAdmin