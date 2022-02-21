import { IonBackButton, IonButton, IonButtons, IonCardSubtitle, IonCardTitle, IonCol, IonFooter, IonHeader, IonIcon, IonImg, IonRow, IonToolbar } from '@ionic/react';
import { arrowForward, closeCircleSharp } from 'ionicons/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { uiHideSignIn, uiShowLogin } from '../../store/ui/ui.actions';

const SlideOne = ({ onBtnClicked, parent = false }) => {
    const dispatch = useDispatch()
    const goToLogin = () => {
        dispatch(uiHideSignIn())
        dispatch(uiShowLogin())
    }

    const close = () => {
        dispatch(uiHideSignIn());
    }

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <>
                <div style={{ justifyContent: 'end', display: 'flex' }}>
                    <IonButton fill='clear' onClick={close}>
                        <IonIcon style={{ fontSize: '25px'}} color='primary' icon={closeCircleSharp}></IonIcon>
                    </IonButton>
                </div>
                <div>
                    <IonImg src={process.env.PUBLIC_URL + '/assets/images/hurricanes_logo.png'}></IonImg>
                </div>
                <div style={{ flex: 1 }}>
                    <IonCardTitle color="primary" style={{ fontSize: '1.5em', padding: '10vw 0 10vw 0' }}>
                        ¡Bienvenido/a!
                    </IonCardTitle>
                    <IonCardSubtitle color="primary" style={{ padding: '0 10vw 10vw 10vw' }}>
                        Para asociarte al club necesitamos que nos brindes algunos datos personales. Recordá que tenés que ser mayor de 18 años para asociarte por tu cuenta.
                    </IonCardSubtitle>
                    <IonCardSubtitle color="primary" style={{ padding: '0 10vw 0 10vw' }}>
                        Si ya estas registrado por favor, andá a la sección de inicio de sesión.
                    </IonCardSubtitle>
                </div>
                <IonFooter mode='ios'>
                    <IonToolbar color="secondary" mode='ios'>
                        <IonRow>
                            <IonCol>
                                <IonButton
                                mode='ios'
                                    expand="full"
                                    fill="clear"
                                    color='light'
                                    // disabled={mySlides.current?.isEnd}
                                    onClick={() => { goToLogin() }}
                                >
                                    Iniciar Sesión
                                </IonButton>
                            </IonCol>
                            <IonCol>
                                <IonButton
                                mode='ios'
                                expand="full"
                                fill="clear"
                                    color='light'
                                    // disabled={mySlides.current?.isEnd}
                                    onClick={() => { onBtnClicked("next") }}
                                >
                                    Siguiente <IonIcon icon={arrowForward} />
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonToolbar>
                </IonFooter>
            </>
            
        </div>
    );
};

export default SlideOne;
