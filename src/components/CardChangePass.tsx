import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonSpinner, IonToast } from '@ionic/react'
import { eyeOffSharp, eyeSharp } from 'ionicons/icons';
import { useState } from 'react'
import { fetchConToken } from '../helpers/fetch';

const CardChangePass = ({ email, goToLogin }) => {
    const [showChecking, setShowChecking] = useState(false)
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const sendPassword = async () => {
        setShowChecking(true);
        if (password !== repassword) {
            setShowChecking(false);
            setShowError(true);
            setError('Las contraseñas no son iguales');
            return;
        }
        try {
            const resp = await fetchConToken('auth/changePassword', { email, password }, 'POST');
            const body = await resp.json();
            if (body.ok) {
                setShowChecking(false);
                goToLogin();
            } else {
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
                                <IonItem className='ion-no-padding'>
                                    <IonLabel position="stacked">Contraseña nueva</IonLabel>
                                    <IonInput autocomplete='language' type={showPassword ? 'text' : 'password'} value={password} onIonChange={e => setPassword(e.detail.value)} clearInput={true}></IonInput>
                                </IonItem>
                                <IonItem className='ion-no-padding'>
                                    <IonLabel position="stacked">Repetir contraseña</IonLabel>
                                    <IonInput autocomplete='language' type={showPassword ? 'text' : 'password'} value={repassword} onIonChange={e => setRepassword(e.detail.value)} clearInput={true}></IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol size='12'>
                                <IonButton expand="block" fill="clear" color='secondary' onClick={() => setShowPassword(!showPassword)}>
                                    <IonIcon src={showPassword ? eyeOffSharp : eyeSharp}/>
                                </IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size='12'>
                                <IonButton expand="block" fill="solid" color='secondary' onClick={sendPassword}>
                                    {
                                        showChecking
                                            ?
                                            <IonSpinner />
                                            :
                                            'Enviar'}
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

export default CardChangePass