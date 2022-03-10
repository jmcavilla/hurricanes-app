import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow } from '@ionic/react'
import { checkmarkCircleSharp } from 'ionicons/icons'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { validateEmail } from '../store/auth/auth.actions';

const Verification = () => {
    const dispatch = useDispatch();
    const [confirmationCode, setConfirmationCode] = useState('')
    return (
        <IonContent>
            <IonGrid>
                <IonRow>
                    <IonCol size='12'>
                        <div className='user__success-icon'>
                            <IonIcon color='success' style={{ fontSize: '20vh' }} src={checkmarkCircleSharp} />
                        </div>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size='12' className='ion-text-center'>
                        <h3>¡Ya casi estás registrado!</h3>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size='12' className='ion-text-center'>
                        <h4>Ahora por favor, usá el código que te enviamos al mail para terminar el registro.</h4>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size='12' className='ion-text-center'>
                        <IonItem>
                            <IonLabel position='stacked'>Código de verificación</IonLabel>
                            <IonInput onIonChange={(e) => { setConfirmationCode(e.detail.value) }}></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size='12' className='ion-text-center'>
                        {/* <IonLabel>¿Querés asociar a tu hijo/a? </IonLabel> */}
                        <IonButton className='' expand='block' size='large' onClick={() => { dispatch(validateEmail(confirmationCode)) }} fill='outline' color='secondary'>
                            <span>ENVÍAR</span>
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default Verification