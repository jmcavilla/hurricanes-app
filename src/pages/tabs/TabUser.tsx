import { IonButton, IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import Socio from './segment/Socio';
import { uiShowLogin, uiShowSignIn } from '../../store/ui/ui.actions';
const TabUser = () => {
    const { data: user } = useSelector((state: RootState) => state.socio)
    const dispatch = useDispatch()
    const asociate = () => {
        dispatch(uiShowSignIn());
    }
    const iniciarSesion = () => {
        dispatch(uiShowLogin());
    }

    return (
        <IonPage>
            {
                user ?
                <>
                    <IonHeader>
                        <IonToolbar mode='md'>
                            <IonTitle>Carnet Digital</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <Socio socio={user} />
                    </IonContent>
                </>
                :
                <>
                    <div className='user__login-icon'>
                        <IonImg
                            className="animate__animated"
                            src={`${process.env.PUBLIC_URL}/assets/images/hurricanes_logo.png`}
                        />
                    </div>
                    <div className='user__login-text'>
                        <h3 style={{
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>
                            ¿Ya sos socio?
                        </h3>
                        <IonButton onClick={iniciarSesion} color='secondary' expand="full">INICIA SESIÓN</IonButton>
                    </div>
                    <div className='user__login-text'>
                        <h3 style={{
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>
                            ¿Querés asociarte al club?
                        </h3>
                        <IonButton onClick={asociate} color='secondary' expand="full">ASOCIATE</IonButton>
                    </div>
                    {/* <div className='user__login-text'>
                        <h3 style={{
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>
                            ¿Querés asociar a tu hijo/hija?
                        </h3>
                        <IonButton onClick={asociate} color='secondary' expand="full">ASOCIALO</IonButton>
                    </div> */}
                </>
            }
        </IonPage>
    );
};

export default TabUser;
