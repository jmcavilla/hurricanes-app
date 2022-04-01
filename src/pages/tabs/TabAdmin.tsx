import { IonCard, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonGrid, IonIcon, IonLabel, IonList, IonModal, IonPage, IonRow, IonSegment, IonSegmentButton, IonSpinner } from '@ionic/react'
import { addCircleOutline, chevronUpCircleSharp, removeCircleOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import EgresosSegment from '../../components/EgresosSegment';
import IngresosSegment from '../../components/IngresosSegment';
import ModalIngreso from '../../components/modals/ModalIngreso';
import { RootState } from '../../store';
import { startGetEgresos, startGetIngresos } from '../../store/admin/admin.actions';

const TabAdmin = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.user);
    const { ingresos, egresos, ingresosCount, egresosCount } = useSelector((state: RootState) => state.admin);
    const [showModalIngreso, setShowModalIngreso] = useState(false)
    const [tipo, setTipo] = useState('')
    const [segment, setSegment] = useState('I');
    useEffect(() => {
        dispatch(startGetIngresos());
        dispatch(startGetEgresos());
    }, [dispatch])

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
                                            <IonCard style={{
                                                    border: '3px solid var(--ion-color-secondary)'
                                            }} className='ion-text-center ion-padding' color='medium'>
                                                <IonCardSubtitle>TOTAL DISPONIBLE</IonCardSubtitle>
                                                <IonCardTitle>${ingresosCount - egresosCount}</IonCardTitle>
                                            </IonCard>
                                        </IonCol>
                                        {/* <IonCol size='6'>
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
                                        </IonCol> */}
                                    </IonRow>
                                    <IonRow>
                                        <IonSegment onIonChange={e => setSegment(e.detail.value)} value={segment}>
                                            <IonSegmentButton value="I">
                                                <IonLabel>Ingresos</IonLabel>
                                            </IonSegmentButton>
                                            <IonSegmentButton value="O">
                                                <IonLabel>Egresos</IonLabel>
                                            </IonSegmentButton>
                                        </IonSegment>
                                            {
                                                segment === 'I' ?
                                                <IonCol size='12'>
                                                    {/* <IonCol size='12'> */}
                                                        <IonCard className='ion-text-center ion-padding' color='success'>
                                                            <IonCardSubtitle color='dark'>INGRESOS</IonCardSubtitle>
                                                            <IonCardTitle color='dark'>${ingresosCount}</IonCardTitle>
                                                        </IonCard>
                                                    {/* </IonCol> */}
                                                    <IngresosSegment />
                                                </IonCol>
                                                :
                                                <IonCol size='12'>
                                                    {/* <IonCol size='12'> */}
                                                        <IonCard className='ion-text-center ion-padding' color='danger'>
                                                            <IonCardSubtitle>EGRESOS</IonCardSubtitle>
                                                            <IonCardTitle>${egresosCount}</IonCardTitle>
                                                        </IonCard>
                                                    {/* </IonCol> */}
                                                    <EgresosSegment />
                                                </IonCol>
                                            }
                                            {/* <>
                                                <IonCol size='6'>
                                                    {
                                                        egresos && egresos.length > 0 ? 
                                                        ingresos?.reverse().slice(0, 10).map((ingreso, i) => (
                                                            <IonList>
                                                                <IonCard autoCapitalize='true' className='ion-text-center'>
                                                                    <IonLabel>{ingreso.concepto.toUpperCase()}</IonLabel>
                                                                    <IonCardTitle>${ingreso.monto}</IonCardTitle>
                                                                    {ingreso.quien}<br />
                                                                    {ingreso.fecha}
                                                                </IonCard>
                                                            </IonList>
                                                        ))
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
                                                </IonCol>
                                                <IonCol size='6'>
                                                    {
                                                        egresos && egresos.length > 0 ? 
                                                        egresos?.reverse().slice(0, 10).map((egreso, i) => (
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
                                                                    <IonChip color={ !egreso.pago ? 'danger' : 'success' }>
                                                                        <IonLabel >
                                                                            { !egreso.pago ? 'No pago' : 'Pagado' }
                                                                        </IonLabel>
                                                                    </IonChip>
                                                                </IonCard>
                                                            </IonList>
                                                        ))
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
                                                </IonCol>
                                            </> */}
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