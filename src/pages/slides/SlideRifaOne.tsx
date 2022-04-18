import { IonAlert, IonButton, IonCardTitle, IonCol, IonContent, IonFooter, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonRow, IonToolbar } from '@ionic/react';
import { arrowForward, man, woman } from 'ionicons/icons';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Gender } from '../../interfaces';
import { format } from 'date-fns';
import DatePicker from 'react-mobile-datepicker';
import { uiHideSignIn } from '../../store/ui/ui.actions';

const SlideRifaOne = ({ onBtnClicked, rifa }) => {
    const dispatch = useDispatch();
    const [showAlert, setShowAlert] = useState(false)
    const [email, setEmail] = useState<string | null>('');
    const [name, setName] = useState<string | null>('');
    const [tel, setTel] = useState<string | null>('');
    const next = () => {

        onBtnClicked("next", {
            email,
            name,
            tel
        })
    }

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <>
                <IonContent>
                    <div style={{ flex: 1, padding: '0vw 0 0 0' }}>
                        <IonImg style={{ height: '85vw'}} src={rifa?.image}/>
                        {/* <IonCardTitle color="primary" style={{ fontSize: '1.5em',padding: '2vw 0 0 0' }}>
                            {rifa?.name}
                        </IonCardTitle> */}
                    </div>
                    <div style={{ flex: 1, padding: '10px 0 0 0' }}>
                        <IonCardTitle color="primary" style={{ fontSize: '1.5em' }}>
                            Completá tus datos
                        </IonCardTitle>
                    </div>
                    <div style={{ padding: '0vw' }}>
                        <IonRow>
                            <IonCol>
                                <IonItem color="">
                                    <IonLabel position="stacked">Nombre y Apellido</IonLabel>
                                    <IonInput autocomplete='off' value={name} autocapitalize='on' onIonChange={e => setName(e.detail.value)}></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem color="">
                                    <IonLabel position="stacked">Email</IonLabel>
                                    <IonInput autocomplete='off' value={email} autocapitalize='on' onIonChange={e => setEmail(e.detail.value)}></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem color="">
                                    <IonLabel position="stacked">Teléfono Celular</IonLabel>
                                    <IonInput type='tel' autocomplete='off' value={tel} autocapitalize='on' onIonChange={e => setTel(e.detail.value)}></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                    </div>
                </IonContent>
                <IonFooter mode='ios' style={{ width: '100vw' }}>
                    <IonToolbar mode='ios' color="secondary" >
                        <IonRow>

                            <IonCol>
                                <IonButton
                                    mode='ios'
                                    expand="full"
                                    fill="clear"
                                    color='light'
                                    onClick={next}
                                    disabled={!name || !email || !tel}
                                >
                                    SIGUIENTE <IonIcon icon={arrowForward} />
                                </IonButton>
                            </IonCol>
                        </IonRow>

                    </IonToolbar>
                </IonFooter>
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={''}
                    subHeader={'Atención'}
                    message={'Lamentablemente no podemos asociarte por este medio ya que sos menor de 18 años, por favor, comunicate con nosotros a traves de instagram para indicarte los pasos a seguir. ¡Muchas gracias!'}
                    buttons={[
                        {
                            text: 'Aceptar',
                            role: 'cancel',
                            cssClass: 'secondary',
                            id: 'cancel-button',
                            handler: blah => {
                                dispatch(uiHideSignIn());
                                // dispatch(uiShowSignInParent());
                                // close()
                            }
                        },
                    ]}
                />
            </>
        </div>
    );
};

export default SlideRifaOne;
