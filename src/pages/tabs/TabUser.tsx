import { IonActionSheet, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import Socio from './segment/Socio';
import { uiCloseLoading, uiOpenLoading, uiShowLogin, uiShowSignIn } from '../../store/ui/ui.actions';
import { useState } from 'react';
import { close, createSharp, logInSharp, logoInstagram, logOutSharp, logoWhatsapp } from 'ionicons/icons';
import { unsetUserAction } from '../../store/user/user.actions';
import { unsetSocioData } from '../../store/socio/socio.actions';
const TabUser = () => {
    const { data: user } = useSelector((state: RootState) => state.socio)
    const [showActionSheet, setShowActionSheet] = useState(false)
    const dispatch = useDispatch()
    const asociate = () => {
        dispatch(uiShowSignIn());
    }
    const iniciarSesion = () => {
        dispatch(uiShowLogin());
    }
    const logOut = () => {
        dispatch(uiOpenLoading())
        dispatch(unsetUserAction());
        dispatch(unsetSocioData());
        setTimeout(() => {
            dispatch(uiCloseLoading())
        }, 1000);
    }
    return (
        <IonPage>
            {
                user ?
                    <>
                        <IonHeader>
                            <IonToolbar mode='md'>
                                <IonTitle>Carnet Digital</IonTitle>
                                {/* <IonButtons slot='end'> */}
                                    <IonButton onClick={logOut} slot='end' color='secondary' fill='outline'>
                                        <IonIcon src={logOutSharp}/>
                                        <span>Salir</span> 
                                    </IonButton>
                                {/* </IonButtons> */}
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
                        <IonGrid>
                            <IonRow>
                                <IonCol size='6' className='ion-text-center'>
                                    <IonLabel color='secondary'>¿Ya sos socio?</IonLabel>
                                    <IonButton onClick={iniciarSesion} className='user__card' fill='solid' color='secondary'>
                                        <div className='user__button_text'>
                                            <IonIcon src={logInSharp}/>
                                            <span>INGRESÁ</span>
                                        </div>
                                    </IonButton>
                                </IonCol>
                                <IonCol size='6' className='ion-text-center'>
                                    <IonLabel color='secondary'>¿Querés ser socio?</IonLabel>
                                    <IonButton onClick={asociate} className='user__card' fill='solid' color='secondary'>
                                        <div className='user__button_text'>
                                            <IonIcon src={createSharp} />
                                            <span>ASOCIATE</span>
                                        </div>
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol size='12' className='ion-text-center'>
                                    <IonLabel>¿Querés asociar a tu hijo/a? </IonLabel>
                                    <IonButton className='user__button_large' onClick={()=> {setShowActionSheet(true)}} fill='outline' color='dark'>
                                        <span>Comunícate con nosotros</span>
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                        <IonActionSheet
                            mode='ios'
                            isOpen={showActionSheet}
                            onDidDismiss={() => setShowActionSheet(false)}
                            cssClass='my-custom-class'
                            buttons={[{
                                text: 'Whatsapp',
                                icon: logoWhatsapp,
                                handler: () => {
                                    console.log('Delete clicked');
                                }
                            },
                            {
                                text: 'Instagram',
                                icon: logoInstagram,
                                handler: () => {
                                    console.log('Delete clicked');
                                }
                                }, {
                                    text: 'Cancelar',
                                    icon: close,
                                    role: 'cancel',
                                    handler: () => {
                                        console.log('Cancel clicked');
                                    }
                                }]}
                        >
                        </IonActionSheet>
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
