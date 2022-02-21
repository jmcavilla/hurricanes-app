import { IonAlert, IonButton, IonCardSubtitle, IonCardTitle, IonCol, IonFooter, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonToolbar } from '@ionic/react'
import { arrowBack, arrowForward, closeCircleSharp } from 'ionicons/icons'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { uiHideSignIn } from '../../store/ui/ui.actions'

const SlideTwoUser = ({ onBtnClicked, parent = false }) => {
    const dispatch = useDispatch()
    const [showAlert, setShowAlert] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const next = () => {
        
        if(!validateEmail(email) || email.length < 6){
            setShowAlert(true);
            return;
        }

        onBtnClicked("next", {
            email,
            password
        });
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const close = () => {
        dispatch(uiHideSignIn());
    }

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* <div style={{ justifyContent: 'end', display: 'flex' }}>
                <IonButton fill='clear' onClick={close}>
                    <IonIcon style={{ fontSize: '25px'}} color='primary' icon={closeCircleSharp}></IonIcon>
                </IonButton>
            </div> */}
            <div style={{ flex: 1, padding: '10vw 0 0 0' }}>
                <IonCardTitle color="primary" style={{ fontSize: '1.5em' }}>
                    Completá los datos de usuario
                </IonCardTitle>
            </div>
            <div style={{ padding: '2vw', flex: 5 }}>
                <IonRow>
                    <IonCol>
                        <IonItem color="">
                            <IonLabel position="floating">Email</IonLabel>
                            <IonInput type='email' value={email} autocapitalize='on' onIonChange={e => setEmail(e.detail.value)}></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem color="">
                            <IonLabel position="floating">Contraseña</IonLabel>
                            <IonInput type='password' value={password} autocapitalize='on' onIonChange={e => setPassword(e.detail.value)}></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem color="">
                            <IonLabel position="floating">Ingresa nuevamente</IonLabel>
                            <IonInput type='password' value={repassword} autocapitalize='on' onIonChange={e => setRepassword(e.detail.value)}></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
            </div>
            <div style={{ flex: 3 }}>
                <IonCardSubtitle color="primary" style={{ fontSize: '1em', padding: '0 10vw 10vw 10vw' }}>
                    La contraseña debe contener por lo menos 6 números y/o letras.
                </IonCardSubtitle>
                {/* <IonCardSubtitle color="primary" style={{ fontSize: '1em', padding: '0 10vw 0 10vw' }}>
                    Si ya estas registrado por favor, andá a la sección de inicio de sesión.
                </IonCardSubtitle> */}
            </div>
            <IonFooter mode='ios' style={{ width: '100vw' }}>
                <IonToolbar mode='ios' color="secondary" >
                    <IonRow>
                        <IonCol>
                            <IonButton
                                mode='ios'
                                expand="full"
                                fill="clear"
                                color='light'
                                // disabled={mySlides.current?.isEnd}
                                onClick={() => onBtnClicked("prev")}
                            >
                                <IonIcon icon={arrowBack} /> Atras
                            </IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton
                                mode='ios'
                                expand="full"
                                fill="clear"
                                color='light'
                                // disabled={mySlides.current?.isEnd}
                                onClick={next}
                                disabled={!email || !password || !repassword}
                            >
                                Siguiente <IonIcon icon={arrowForward} />
                            </IonButton>
                        </IonCol>
                    </IonRow>

                </IonToolbar>
            </IonFooter>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                cssClass='my-custom-class'
                header={'Formato de email incorrecto'}
                buttons={['OK']}
            />
        </div>
    )
}

export default SlideTwoUser