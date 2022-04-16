import { IonButton, IonCard, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFooter, IonIcon, IonImg, IonItem, IonLabel, IonRow, IonSpinner, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { arrowBack, arrowForward, cameraSharp, checkmarkCircleSharp, imagesSharp, personSharp } from 'ionicons/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Camera, CameraResultType, CameraDirection, CameraSource } from '@capacitor/camera';
import { uiSetError } from '../../store/ui/ui.actions';
import { RootState } from '../../store';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser';

const SlideRifaFour = ({ onBtnClicked, numbers  }) => {
    const { loading } = useSelector((state: RootState) => state.ui);
    const dispatch = useDispatch()
    const [photo, setPhoto] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const end = async () => {
        onBtnClicked('end', {
            comprobante: photo
        })
    }

    const takePhoto = async () => {

        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Base64,
            correctOrientation: true,
            direction: CameraDirection.Front,
            source: CameraSource.Camera
        })
        if(image){
            setPhoto('data:image/jpeg;base64,' + image.base64String);
        }else{
            dispatch(uiSetError({
                code: 400,
                message: 'No se cargo ninguna imagen'
            }))
        }
        
    }

    const uploadPhoto = async ()=>{
        const image = await Camera.getPhoto({
            quality: 40,
            allowEditing: false,
            resultType: CameraResultType.Base64,
            source: CameraSource.Photos
        })

        if(image){
            setPhoto('data:image/jpeg;base64,' + image.base64String);
        }else{
            dispatch(uiSetError({
                code: 400,
                message: 'No se cargo ninguna imagen'
            }))
        }
    }

    const openMP = () => {
        InAppBrowser.create("https://www.mercadopago.com.ar/money-transfer")
    }

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* <div style={{ justifyContent: 'end', display: 'flex' }}>
                <IonButton fill='clear' onClick={close}>
                    <IonIcon style={{ fontSize: '25px'}} color='primary' icon={closeCircleSharp}></IonIcon>
                </IonButton>
            </div> */}
            <IonContent>

                
                
                    <>
                        <div style={{ padding: '' }}>
                            {/* <IonCard className='ion-padding'> */}

                                <IonIcon style={{ fontSize: '20vh', padding: '5v'}} color='success' src={checkmarkCircleSharp} />
                            {/* </IonCard> */}
                            <IonRow>
                                <IonCol>
                                    <IonTitle color="primary" style={{ fontSize: '1em' }}>
                                        <strong>¡Muchas gracias por tu apoyo!</strong> 
                                    </IonTitle> <br />
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonText>
                                        Uno de nuestros administradores verificará que este todo correcto y confirmará tus números. 
                                        Mientras tanto, no te preocupes, estos quedarán reservados para vos.
                                    </IonText>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonText>
                                        <strong>Verificá tu casilla de correo, ahí envíamos el comprobante de los números.</strong> 
                                    </IonText>
                                </IonCol>
                            </IonRow>
                            <div style={{
                                display: 'flex',
                                margin: '10px',
                                justifyContent: 'center'
                            }}>

                            {
                                numbers.map( number => (
                                    <div style={{
                                        border: '1px solid #000',
                                        borderRadius: '10px',
                                        width: '50px',
                                        fontSize: '25px',
                                        margin: '3px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {`${number.numero}`}
                                    </div>
                                ))
                            }
                            </div>
                        </div>

                    </>
                
            </IonContent>
            <IonFooter mode='ios' style={{ width: '100vw' }}>
                <IonToolbar mode='ios' color="secondary" >
                    {/* <IonRow>
                        <IonCol>
                            <IonButton
                                mode='ios'
                                expand="full"
                                fill="clear"
                                color='light'
                                // disabled={mySlides.current?.isEnd}
                                onClick={() => onBtnClicked("prev")}
                            >
                                <IonIcon icon={arrowBack} /> ATRÁS
                            </IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton
                                mode='ios'
                                expand="full"
                                fill="clear"
                                color='light'
                                disabled={ !photo }
                                onClick={end}
                            >
                                FINALIZAR <IonIcon icon={arrowForward} />
                            </IonButton>
                        </IonCol>
                    </IonRow> */}

                </IonToolbar>
            </IonFooter>
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={"Dato copiado al portapapeles"}
                duration={1500}
                mode='ios'
            />
        </div>
    );
};

export default SlideRifaFour;
