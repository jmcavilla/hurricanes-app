import { IonButton, IonCard, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonGrid, IonIcon, IonItem, IonList, IonModal, IonPage, IonProgressBar, IonRow, IonSpinner } from '@ionic/react'
import { addCircleOutline, addSharp, chevronUp, chevronUpCircleSharp, logoFacebook, logoVimeo, removeCircleOutline } from 'ionicons/icons';
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
                            ingresos && egresos && ingresos.length > 0 && egresos.length > 0 
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
                                                                <IonItem>
                                                                    {ingreso.concepto.toUpperCase()}<br />
                                                                    ${ingreso.monto} <br />
                                                                    {ingreso.quien}<br />
                                                                    {ingreso.fecha}
                                                                </IonItem>
                                                            </IonList>
                                                        ))
                                                    }
                                                </IonCol>
                                                <IonCol size='6'>
                                                    {
                                                        egresos?.map((egreso, i) => (
                                                            <IonList>
                                                                <IonItem autoCapitalize='true'>
                                                                    {egreso.concepto.toUpperCase()}<br /> 
                                                                    ${egreso.monto}<br /> 
                                                                    {egreso.quien}<br /> 
                                                                    {egreso.fecha}
                                                                </IonItem>
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