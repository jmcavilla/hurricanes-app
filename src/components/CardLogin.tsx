import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonRow, IonSpinner, IonToast } from '@ionic/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { startLogin } from '../store/auth/auth.actions';

const CardLogin = ({ email , setEmail, showOlvideAction, showChangeSuccess, setShowChangeSuccess }) => {
    const { loading } = useSelector((state:RootState) => state.ui);
    const [password, setPassword] = useState('');
    
    const dispatch = useDispatch();
    const login = async () => {
        dispatch(startLogin(email, password));
    }

    return (
        <>
            <IonToast
                color='success'
                isOpen={true}
                onDidDismiss={() => setShowChangeSuccess(false)}
                message="Se cambió correctamente la contraseña."
                duration={3000}
            />
            <IonCard style={{
                border: '2px solid var(--ion-color-secondary)',
                width: '100%'
            }}>
                <IonCardContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonItem className='ion-no-padding'>
                                    <IonLabel position="stacked">Email</IonLabel>
                                    <IonInput autocomplete='off' value={email} onIonChange={e => setEmail(e.detail.value)}></IonInput>
                                </IonItem>
                                <IonItem className='ion-no-padding'>
                                    <IonLabel position="stacked">Contraseña</IonLabel>
                                    <IonInput autocomplete='off'   type='password' value={password} onIonChange={e => setPassword(e.detail.value)} clearInput={true}></IonInput>
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
                                <IonButton expand="block" fill="clear" color='primary' size='small' onClick={ showOlvideAction }>Olvidé mi contraseña</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCardContent>
            </IonCard>
        </>
    )
}

export default CardLogin