import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRow, IonSpinner } from '@ionic/react'
import { closeCircleSharp, personCircleSharp } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { RootState } from '../store'
import { startChecking, startLogin } from '../store/auth/auth.actions'
import { uiHideLogin } from '../store/ui/ui.actions'

const LoginPage = () => {
    const { loading } = useSelector((state:RootState) => state.ui);
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
                <IonGrid>
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
                    <IonRow>


                        <IonCard style={{
                            border: '2px solid var(--ion-color-secondary)'
                        }}>
                            <IonCardContent>
                                <IonGrid>
                                    {/* <IonRow>
                                        <IonCol className='login__icon-center'>
                                            <IonIcon src={personCircleSharp} color='primary' style={{ fontSize: '5rem' }} />
                                        </IonCol>
                                    </IonRow> */}
                                    <IonRow>
                                        <IonCol>
                                            <IonItem className='ion-no-padding'>
                                                <IonLabel position="stacked">Email</IonLabel>
                                                <IonInput autocomplete='language' value={email} onIonChange={e => setEmail(e.detail.value)}></IonInput>
                                            </IonItem>
                                            <IonItem className='ion-no-padding'>
                                                <IonLabel position="stacked">Contraseña</IonLabel>
                                                <IonInput autocomplete='language' type='password' value={password} onIonChange={e => setPassword(e.detail.value)} clearInput={true}></IonInput>
                                            </IonItem>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol size='12'>
                                            <IonButton expand="block" fill="solid" color='secondary' onClick={login}>
                                            {
                                        loading 
                                            ?
                                            <IonSpinner />
                                            :
                                            'Ingresar'}
                                            </IonButton>
                                        </IonCol>
                                        <IonCol size='12'>
                                            <IonButton expand="block" fill="clear" color='primary' size='small'>Olvidé mi contraseña</IonButton>
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
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default LoginPage
