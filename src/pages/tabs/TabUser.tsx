import { IonButton, IonHeader, IonIcon, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import Carnet from '../../components/Carnet';
import Login from '../../components/Login';
import Verification from '../../components/Verification';
import SocioData from '../../components/SocioData';
import { logOutSharp } from 'ionicons/icons';
import { startLogout } from '../../store/auth/auth.actions';
const TabUser = () => {
    const { data: socio, checking, familia } = useSelector((state: RootState) => state.socio);
    const { user } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch()
    const logOut = () => {
        dispatch(startLogout());
    }
    return (
        <IonPage>
            {
                user ?
                    <>
                    <IonHeader>
                        <IonToolbar mode='md'>
                            <IonTitle>Carnét Digital</IonTitle>
                            <IonButton onClick={logOut} slot='end' color='secondary' fill='outline'>
                                <IonIcon src={logOutSharp} />
                                <span>Salir</span>
                            </IonButton>
                        </IonToolbar>
                    </IonHeader>
                        {
                            (socio || (familia && familia.length > 0)) ?
                                <Carnet />
                                :
                                checking 
                                ?
                                <div style={{
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent:'center',
                                    alignItems: 'center'
                                }}>
                                    <IonSpinner  color='secondary' name="crescent" />
                                </div>
                                :
                                user.status !== 'Pending' ?
                                    <SocioData />
                                    :
                                    <Verification />
                        }
                    </>
                    :
                    <>
                        <Login />
                    </>
            }
        </IonPage>
    );
};

export default TabUser;
