import { IonButton, IonCard, IonCardContent, IonCardTitle, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonRow, IonSpinner, IonToast } from '@ionic/react'
import React, { useState } from 'react'
import { fetchConToken } from '../helpers/fetch';

const CardToken = ({ email, showChangeAction }) => {
    const [token, setToken] = useState('');
    const [showChecking, setShowChecking] = useState(false)
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState('')
    const sendToken = async () => {
        setShowChecking(true);
        try {
            const resp = await fetchConToken('auth/validateToken', { confirmationCode: token }, 'POST');
            const body = await resp.json();

            if(body.ok){
                setShowChecking(false);
                showChangeAction();
            }else{
                setShowError(true);
                setError('Ocurrio un error, intentelo nuevamente')
            }
        } catch (error) {
            setShowChecking(false);
            setShowError(true);
            setError('Ocurrio un error, intentelo nuevamente')
        }
    }
    return (
        <>
            <IonCard style={{
                border: '2px solid var(--ion-color-secondary)',
                width: '100%'
            }}>
                <IonCardContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonCardTitle>Ingresá el código que te llego al email <strong>{email}</strong></IonCardTitle>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem className='ion-no-padding'>
                                    <IonLabel position="stacked">Token</IonLabel>
                                    <IonInput autocomplete='language' value={token} onIonChange={e => setToken(e.detail.value)}></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size='12'>
                                <IonButton expand="block" fill="solid" color='secondary' onClick={sendToken}>
                                    {
                                        showChecking
                                            ?
                                            <IonSpinner />
                                            :
                                            'Validar'
                                    }
                                </IonButton>
                            </IonCol>

                        </IonRow>
                    </IonGrid>
                </IonCardContent>
            </IonCard>
            <IonToast
                isOpen={showError}
                color='danger'
                onDidDismiss={() => setShowError(false)}
                message={ error }
                duration={5000}
            />
        </>
    )
}

export default CardToken