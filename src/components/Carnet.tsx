import { IonButton, IonCard, IonCardContent, IonChip, IonCol, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonModal, IonRow, IonTitle, IonToolbar } from '@ionic/react'
import { closeCircleSharp, logOutSharp } from 'ionicons/icons'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Socio from '../pages/tabs/segment/Socio'
import { RootState } from '../store'
import { startLogout } from '../store/auth/auth.actions'
import { startGetCuotasSocio } from '../store/cuota/cuota.actions'
import { unsetSocioData } from '../store/socio/socio.actions'
import { uiCloseLoading, uiOpenLoading } from '../store/ui/ui.actions'
import { unsetUserAction } from '../store/user/user.actions'
import 'moment/locale/es';
const Carnet = () => {
    const { data: socio } = useSelector((state: RootState) => state.socio);
    const { cuotas } = useSelector((state: RootState) => state.cuota);
    const dispatch = useDispatch();
    const [showCuotas, setShowCuotas] = useState(false)
    moment.locale('es');
    useEffect(() => {
        dispatch(startGetCuotasSocio(socio._id))
    }, [])
    
    return (
        <>
            <IonContent>
                <Socio socio={socio} />
                <IonRow style={{ marginTop: '20px' }}>
                    {/* <IonCol>
                        <div style={{ padding: '0 10vw' }}>
                            <IonButton color='secondary' fill='outline' expand='block'> VER FICHA</IonButton>
                        </div>
                    </IonCol> */}
                    <IonCol>
                        <div style={{ padding: '0 10vw'}}>
                            <IonButton color='secondary' fill='solid' expand='block'  onClick={() => setShowCuotas(true)}> VER CUOTAS</IonButton>
                        </div>
                    </IonCol>
                </IonRow>
            </IonContent>
            <IonModal isOpen={showCuotas}>
                <IonHeader>
                    <IonToolbar color='secondary'>
                    <IonRow>
                        <IonCol size='8' style={{
                            justifyContent: 'start',
                            display: 'flex'
                        }}>
                            <IonTitle>Cuotas</IonTitle>
                        </IonCol>
                        <IonCol size='4' style={{
                            justifyContent: 'end',
                            display: 'flex'
                        }}>
                            <IonButton fill='clear' onClick={() => setShowCuotas(false)}>
                                <IonIcon style={{ fontSize: '25px' }} color='light' icon={closeCircleSharp}></IonIcon>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {
                        cuotas?.map( (cuota, i) => (
                            <IonCard key={i}>
                                <IonCardContent>
                                    <IonRow>
                                        <IonCol size='4'>
                                            <IonLabel>
                                                <strong>{moment.months(cuota.mes - 1).toLocaleUpperCase()}</strong>
                                                <h3>${cuota.monto}</h3>
                                            </IonLabel>
                                        </IonCol>
                                        <IonCol size='8' style={{
                                            justifyContent: 'end',
                                            display: 'flex'
                                        }}>

                                            <IonChip color={ cuota.status === 'Pending' ? 'danger' : 'success' }>
                                                <IonLabel >
                                                    { cuota.status === 'Pending' ? 'No pago' : 'Pagado' } {cuota.status === 'Accepted' && `- ${cuota.fecha_pago}`}
                                                </IonLabel>
                                            </IonChip>
                                        </IonCol>
                                    </IonRow>
                                </IonCardContent>
                            </IonCard>
                        ))
                    }
                </IonContent>
            </IonModal>
        </>
    )
}

export default Carnet