import { IonAlert, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle } from '@ionic/react';
import axios from 'axios';
import { closeCircleSharp } from 'ionicons/icons';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startRegister } from '../store/auth/auth.actions';
import { uiHideSignIn, uiSetError } from '../store/ui/ui.actions';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reemail, setReemail] = useState('')
    const [repassword, setRepassword] = useState('');
    const [nombre, setNombre] = useState('');
    const dispatch = useDispatch();

    const close = () => {
        dispatch(uiHideSignIn());
    }
    const onBtnClicked = async () => {
        if (nombre === '') {
            dispatch(uiSetError({
                code: 400,
                message: 'El campo nombre es obligatorio'
            }))
            return;
        }
        if (email === '') {
            dispatch(uiSetError({
                code: 400,
                message: 'El campo email es obligatorio'
            }))
            return;
        }
        if (password === '') {
            dispatch(uiSetError({
                code: 400,
                message: 'El campo contraseña es obligatorio'
            }))
            return;
        }
        if (password !== repassword) {
            dispatch(uiSetError({
                code: 400,
                message: 'Las contraseñas no coinciden'
            }))
            return;
        }
        if (!validateEmail(email)) {
            dispatch(uiSetError({
                code: 400,
                message: 'El formato del email es incorrecto'
            }))
            return;
        }
        if (email !== reemail) {
            dispatch(uiSetError({
                code: 400,
                message: 'Los correos no coinciden'
            }))
            return;
        }
        dispatch(startRegister(email, password, nombre))
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    return (
        <IonPage>
            <IonContent>
                <IonRow>
                    <IonCol size='12' style={{
                        justifyContent: 'end',
                        display: 'flex'
                    }}>
                        <IonButton fill='clear' onClick={close}>
                            <IonIcon style={{ fontSize: '25px' }} color='primary' icon={closeCircleSharp}></IonIcon>
                        </IonButton>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <div className='img-container'>

                            <IonImg
                                className="img"
                                src={`${process.env.PUBLIC_URL}/assets/images/hurricanes_logo.png`}
                            />
                        </div>
                    </IonCol>
                </IonRow>
                <IonRow style={{ textAlign: 'center' }}>
                    <IonCol>
                        <IonTitle>Completá los datos</IonTitle>
                    </IonCol>
                </IonRow>
                <IonRow style={{ justifyContent: 'center' }}>

                    <IonCard style={{
                        border: '2px solid var(--ion-color-secondary)',
                    }}>
                        <IonCardContent>
                            <IonRow>
                                <IonCol>
                                    <IonItem color="">
                                        <IonLabel position="stacked">Nombre</IonLabel>
                                        <IonInput type='email' value={nombre} autocapitalize='on' onIonChange={e => setNombre(e.detail.value)}></IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem color="">
                                        <IonLabel position="stacked">Email</IonLabel>
                                        <IonInput type='email' value={email} autocapitalize='on' onIonChange={e => setEmail(e.detail.value)}></IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem color="">
                                        <IonLabel position="stacked">Repetir Email</IonLabel>
                                        <IonInput type='email' value={reemail} autocapitalize='on' onIonChange={e => setReemail(e.detail.value)}></IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem color="">
                                        <IonLabel position="stacked">Contraseña</IonLabel>
                                        <IonInput type='password' value={password} autocapitalize='on' onIonChange={e => setPassword(e.detail.value)}></IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem color="">
                                        <IonLabel position="stacked">Ingresa nuevamente</IonLabel>
                                        <IonInput type='password' value={repassword} autocapitalize='on' onIonChange={e => setRepassword(e.detail.value)}></IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol size='12'>
                                    <IonButton expand="block" fill="solid" color='secondary' onClick={onBtnClicked}>Envíar</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonCardContent>
                    </IonCard>
                </IonRow>

            </IonContent>
        </IonPage>
    );
};

export default SignInPage;
