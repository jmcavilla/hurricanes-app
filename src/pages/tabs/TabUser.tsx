import { IonActionSheet, IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import Socio from './segment/Socio';
import { uiShowLogin, uiShowSignIn } from '../../store/ui/ui.actions';
import { useState } from 'react';
import { close, createSharp, logInSharp, logoInstagram, logoWhatsapp } from 'ionicons/icons';
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
                        {/* <div className='user__login-text'>
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
                    </div> */}
                        <IonGrid>
                            <IonRow>
                                <IonCol size='6' className='ion-text-center'>
                                    {/* <IonCard
                                        className='ion-padding ion-text-center user__card'
                                        color='secondary'>
                                            <IonLabel>¿Ya sos socio?</IonLabel>
                                            <IonButton onClick={iniciarSesion} fill='outline'>INGRESÁ</IonButton>
                                    </IonCard> */}
                                    <IonLabel color='secondary'>¿Ya sos socio?</IonLabel>
                                    <IonButton onClick={iniciarSesion} className='user__card' fill='solid' color='secondary'>
                                        <div className='user__button_text'>
                                            <IonIcon src={logInSharp}/>
                                            <span>INGRESÁ</span>
                                        </div>
                                    </IonButton>
                                </IonCol>
                                <IonCol size='6' className='ion-text-center'>
                                    {/* <IonCard
                                        className='ion-padding ion-text-center user__card'
                                        color='secondary'>
                                            <IonLabel>¿Querés asociarte al club?</IonLabel>
                                            <IonButton onClick={asociate} fill='outline'>ASOCIATE</IonButton>
                                    </IonCard> */}
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
                                    {/* <IonCard
                                        className='ion-padding ion-text-center'
                                        color='tertiary'>
                                            <IonLabel>¿Querés asociar a tu hijo/a? </IonLabel>
                                            <IonButton onClick={asociate} fill='outline'>Comunícate con nosotros</IonButton>
                                    </IonCard> */}
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
