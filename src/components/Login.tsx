import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser';
import { IonActionSheet, IonButton, IonCol, IonGrid, IonIcon, IonImg, IonLabel, IonRow, IonSpinner, IonText } from '@ionic/react';
import { close, createSharp, logInSharp, logoInstagram, logoWhatsapp } from 'ionicons/icons';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { uiShowLogin, uiShowSignIn } from '../store/ui/ui.actions';

const Login = () => {
    const [showActionSheet, setShowActionSheet] = useState(false);
    const { loading } = useSelector((state: RootState) => state.ui);
    const dispatch = useDispatch()
    const asociate = () => {
        dispatch(uiShowSignIn());
    }
    const iniciarSesion = () => {
        dispatch(uiShowLogin());
    }
    return (
        <>
            {loading ?
            <div className='login__spinner'>
                <IonSpinner />
            </div>
                :
                <><div className='user__login-icon'>
                    <IonImg
                        className="animate__animated"
                        src={`${process.env.PUBLIC_URL}/assets/images/hurricanes_logo.png`}
                        style={{ height: '40vh' }}
                    />
                </div>
                    <IonGrid>
                        <IonRow>
                            <IonCol size='6' className='ion-text-center'>
                                <IonLabel color='secondary'>¿Ya sos socio?</IonLabel>
                                <IonButton onClick={iniciarSesion} className='user__card' fill='solid' color='secondary'>
                                    <div className='user__button_text'>
                                        <IonIcon src={logInSharp} />
                                        <span>INGRESÁ</span>
                                    </div>
                                </IonButton>
                            </IonCol>
                            <IonCol size='6' className='ion-text-center'>
                                <IonLabel color='secondary'>¿Querés ser socio?</IonLabel>
                                <IonButton onClick={asociate} className='user__card' fill='solid' color='secondary'>
                                    <div className='user__button_text'>
                                        <IonIcon src={createSharp} />
                                        <span>REGISTRATE</span>
                                    </div>
                                </IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size='12' className='ion-text-center'>
                                <IonLabel> <strong>¿Querés asociar a tu hijo/a?</strong>  </IonLabel> <br />
                                {/* <IonButton className='user__button_large' onClick={() => { setShowActionSheet(true) }} fill='outline' color='dark'>
                                    <span>Comunícate con nosotros</span>
                                </IonButton> */}
                                <IonText>Para poder asociar a tu hijo/a primero, por favor, registrá tus datos desde el botón de registro. Luego podras cargar los datos de tu hijo/a.</IonText>
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
                                InAppBrowser.create(`https://api.whatsapp.com/send?phone=${5491163635592}`, '_system');
                            }
                        },
                        {
                            text: 'Instagram',
                            icon: logoInstagram,
                            handler: () => {
                                InAppBrowser.create(`https://www.instagram.com/hurricanes_rugbyba/`, '_system');
                            }
                        }, {
                            text: 'Cancelar',
                            icon: close,
                            role: 'cancel',
                            handler: () => {
                            }
                        }]}
                    >
                    </IonActionSheet>
                </>
            }
        </>
    )
}

export default Login