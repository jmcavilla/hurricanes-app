import { IonButton, IonCard, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFooter, IonIcon, IonImg, IonItem, IonLabel, IonRow, IonSpinner, IonToast, IonToolbar } from '@ionic/react';
import { arrowBack, arrowForward, cameraSharp, imagesSharp, personSharp } from 'ionicons/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Camera, CameraResultType, CameraDirection, CameraSource } from '@capacitor/camera';
import { uiSetError } from '../../store/ui/ui.actions';
import { RootState } from '../../store';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser';

const SlideRifaThree = ({ onBtnClicked, rifa, quantity  }) => {
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
                            <IonCard className='ion-padding'>

                                <IonCardTitle color="primary" style={{ fontSize: '1.5em' }}>
                                    Precio Final: ${rifa?.value * quantity}
                                </IonCardTitle>
                            </IonCard>
                            <IonRow>
                                <IonCol>
                                    <IonLabel color="primary" style={{ fontSize: '1em' }}>
                                        Por favor, dirigite a <strong> Mercado Pago</strong> y envía el dinero con alguno de los siguientes datos:
                                    </IonLabel> <br />

                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel>
                                            <strong>1130647410</strong>
                                        </IonLabel>
                                    <IonButton fill='clear' onClick={() => {
                                        setShowToast(true);
                                        navigator.clipboard.writeText("1130647410")
                                    }}>copiar</IonButton> <br />
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel>
                                        <strong>juanmanuelcavilla@gmail.com</strong>
                                        </IonLabel>
                                        <IonButton fill='clear' onClick={() => {
                                            setShowToast(true);
                                            navigator.clipboard.writeText("juanmanuelcavilla@gmail.com")
                                        }}>copiar</IonButton>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            

                        </div>

                        <IonRow>
                            <IonCol>

                            <IonButton color='mp' expand='block' onClick={openMP}>IR A MERCADO PAGO</IonButton>
                            </IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol>
                                <IonLabel color="primary" style={{ fontSize: '1em' }}>
                                        Cuando termines, por favór, regresá y cargá el comprobante del envío de dinero.
                                </IonLabel> 
                                <IonButton color='secondary' expand='block' onClick={uploadPhoto}>CARGAR COMPROBANTE</IonButton>
                            </IonCol>
                        </IonRow>
                        {photo && <IonRow>
                            <IonCol>
                                <IonImg src={photo}/>
                            </IonCol>
                        </IonRow>}
                    </>
                
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
                    </IonRow>

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

export default SlideRifaThree;
