import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRow } from '@ionic/react'
import { closeCircleSharp, personCircleSharp } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { RootState } from '../store'
import { startChecking, startLogin } from '../store/auth/auth.actions'
import { uiHideLogin } from '../store/ui/ui.actions'

const LoginPage = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    const login = async () => {
        dispatch(startLogin(email, password));
    }

    const register = () => {
        history.push('signIn');
    }

    useEffect(() => {
        dispatch(startChecking())
    }, [])
    
    const close = () => {
        dispatch(uiHideLogin());
    }
    return (
        <IonPage>
            <IonContent>
                <div style={{ flex: 3, justifyContent: 'end', display: 'flex' }}>
                    <IonButton fill='clear' onClick={close}>
                        <IonIcon style={{ fontSize: '25px'}} color='primary' icon={closeCircleSharp}></IonIcon>
                    </IonButton>
                </div>
                <div className='login__logo-container'>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonImg
                                    className="animate__animated"
                                    src={`${process.env.PUBLIC_URL}/assets/images/hurricanes_logo.png`}
                                />
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
                <div className='login__container'>
                    <IonCard>
                        <IonCardContent>
                            <IonGrid>
                                <IonRow>
                                    <IonCol className='login__icon-center'>
                                        <IonIcon src={personCircleSharp} color='primary' style={{ fontSize: '5rem' }} />
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonItem className='ion-no-padding'>
                                            <IonLabel position="stacked">Email</IonLabel>
                                            <IonInput value={email} onIonChange={e => setEmail(e.detail.value)}></IonInput>
                                        </IonItem>
                                        <IonItem className='ion-no-padding'>
                                            <IonLabel position="stacked">Contraseña</IonLabel>
                                            <IonInput type='password' value={password} onIonChange={e => setPassword(e.detail.value)} clearInput={true}></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonButton expand="full" fill="solid" color='secondary' onClick={login}>Ingresar</IonButton>
                                    </IonCol>
                                </IonRow>
                                {/* <IonRow>
                                    <IonCol>
                                        <IonButton expand="full" fill="clear" color='secondary' onClick={register}>Registrate</IonButton>
                                    </IonCol>
                                </IonRow> */}
                            </IonGrid>
                        </IonCardContent>
                    </IonCard>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default LoginPage
