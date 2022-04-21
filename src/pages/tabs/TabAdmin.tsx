import { IonCard, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonGrid, IonIcon, IonLabel, IonList, IonModal, IonPage, IonRow, IonSegment, IonSegmentButton, IonSpinner } from '@ionic/react'
import { addCircleOutline, chevronUpCircleSharp, removeCircleOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import EgresosSegment from '../../components/EgresosSegment';
import IngresosSegment from '../../components/IngresosSegment';
import ModalIngreso from '../../components/modals/ModalIngreso';
import { RootState } from '../../store';
import { startGetEgresos, startGetIngresos, startGetRifa } from '../../store/admin/admin.actions';
import ContablePage from '../ContablePage';
import RifaAdminPage from '../RifaAdminPage';
import SociosPage from '../SociosPage';

const TabAdmin = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.user);
    const { rifa } = useSelector((state: RootState) => state.admin);
    const [segment, setSegment] = useState('S');
    useEffect(() => {
        dispatch(startGetIngresos());
        dispatch(startGetEgresos());
        dispatch(startGetRifa());
    }, [dispatch])



    return (
        <IonPage>
            <IonContent>
                {
                    !user
                        ?
                        <h3>Si llegaste hasta aca, algo no está bien.</h3>
                        :
                        <>
                            <IonSegment onIonChange={e => setSegment(e.detail.value)} value={segment}>
                                <IonSegmentButton value="S">
                                    {segment === 'S' ? <IonLabel color='primary'><strong>SOCIOS</strong></IonLabel> : <IonLabel>SOCIOS</IonLabel>}
                                </IonSegmentButton>
                                {user.admin_count && <IonSegmentButton value="C">
                                    {segment === 'C' ? <IonLabel color='primary'><strong>CONTABLE</strong></IonLabel> : <IonLabel>CONTABLE</IonLabel>}
                                </IonSegmentButton>}
                                {rifa && <IonSegmentButton value="R">
                                    {segment === 'R' ? <IonLabel color='primary'><strong>RIFAS</strong></IonLabel> : <IonLabel>RIFAS</IonLabel>}
                                </IonSegmentButton>}
                            </IonSegment>
                            {
                                segment === 'C' && <ContablePage />
                            }
                            {
                                segment === 'R' && <RifaAdminPage />
                            }
                            {
                                segment === 'S' && <SociosPage />
                            }
                        </>
                }
            </IonContent>
        </IonPage>
    )
}

export default TabAdmin