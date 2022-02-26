import { IonActionSheet, IonButton, IonCol, IonGrid, IonIcon, IonImg, IonLabel, IonRow } from '@ionic/react';
import { close, createSharp, logInSharp, logoInstagram, logoWhatsapp } from 'ionicons/icons';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { uiShowLogin, uiShowSignIn } from '../store/ui/ui.actions';

const Login = () => {
    const [showActionSheet, setShowActionSheet] = useState(false);
    const dispatch = useDispatch()
    const asociate = () => {
        dispatch(uiShowSignIn());
    }
    const iniciarSesion = () => {
        dispatch(uiShowLogin());
    }
    return (
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
                                <span>ASOCIATE</span>
                            </div>
                        </IonButton>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size='12' className='ion-text-center'>
                        <IonLabel>¿Querés asociar a tu hijo/a? </IonLabel>
                        <IonButton className='user__button_large' onClick={() => { setShowActionSheet(true) }} fill='outline' color='dark'>
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
        </>
    )
}

export default Login