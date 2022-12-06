import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonRow, IonSpinner, IonCardTitle, IonToast } from '@ionic/react'
import React, { useState } from 'react'
import { fetchConToken } from '../helpers/fetch'

const CardOlvide = ({ email, setEmail, showTokenOlvideAction }) => {
    const [showChecking, setShowChecking] = useState(false)
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState('')
    const sendEmailOlvide = async () => {
        setShowChecking(true);
        try {
            const resp = await fetchConToken('auth/forgot', { email }, 'POST');
            const body = await resp.json();

            if(body.ok){
                showTokenOlvideAction();
                setShowChecking(false);
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
                                <IonCardTitle>Ingresá el mail que utilizaste</IonCardTitle>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem className='ion-no-padding'>
                                    <IonLabel position="stacked">Email</IonLabel>
                                    <IonInput autocomplete='language' value={email} onIonChange={e => setEmail(e.detail.value.trim())}></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size='12'>
                                <IonButton expand="block" fill="solid" color='secondary' onClick={sendEmailOlvide}>
                                    {
                                        showChecking
                                            ?
                                            <IonSpinner />
                                            :
                                            'Envíar'
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

export default CardOlvide