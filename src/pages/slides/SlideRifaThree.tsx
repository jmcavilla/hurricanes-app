import { IonButton, IonCard, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonItem, IonItemDivider, IonLabel, IonModal, IonRow, IonSpinner, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { arrowBack, arrowForward, cameraSharp, closeCircleSharp, imagesSharp, personSharp } from 'ionicons/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Camera, CameraResultType, CameraDirection, CameraSource } from '@capacitor/camera';
import { uiSetError } from '../../store/ui/ui.actions';
import { RootState } from '../../store';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser';

const SlideRifaThree = ({ onBtnClicked, rifa, quantity }) => {
    const { loading } = useSelector((state: RootState) => state.ui);
    const dispatch = useDispatch()
    const [photo, setPhoto] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [showDatos, setShowDatos] = useState(false);
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
        if (image) {
            setPhoto('data:image/jpeg;base64,' + image.base64String);
        } else {
            dispatch(uiSetError({
                code: 400,
                message: 'No se cargo ninguna imagen'
            }))
        }

    }

    const uploadPhoto = async () => {
        const image = await Camera.getPhoto({
            quality: 40,
            allowEditing: false,
            resultType: CameraResultType.Base64,
            source: CameraSource.Photos
        })

        if (image) {
            setPhoto('data:image/jpeg;base64,' + image.base64String);
        } else {
            dispatch(uiSetError({
                code: 400,
                message: 'No se cargo ninguna imagen'
            }))
        }
    }

    const openMP = () => {
        InAppBrowser.create("https://www.mercadopago.com.ar", "_system")
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
                        <IonCard className='ion-padding' color='secondary'>
                            <IonCardTitle color="primary" style={{ fontSize: '1.5em' }}>
                                Precio Final: ${rifa?.value * quantity}
                            </IonCardTitle>
                        </IonCard>
                        {/* <IonLabel className='ion-margin-top' color="primary"> */}
                        <p> Por favor, dirigite a <strong> Mercado Pago</strong> y envía el dinero con alguno de los siguientes datos. <br />
                            También te dejamos los datos para realizar una transferencia bancaria.</p>
                        <IonRow>
                            <IonCol>
                                <IonButton color='primary' expand='block' fill='outline' onClick={() => setShowDatos(true)}>VER DATOS</IonButton>
                            </IonCol>
                        </IonRow>
                        <p>Cuando termines, por favór, regresá y cargá el comprobante del envío de dinero.</p>
                        {/* </IonLabel> <br /> */}
                        <IonRow>
                            <IonCol>
                                <IonButton color='secondary' expand='block' fill='solid' onClick={uploadPhoto}>CARGAR COMPROBANTE</IonButton>
                            </IonCol>
                        </IonRow>
                        {photo && <IonRow>
                            <IonCol>
                                <IonImg style={{ height: '100vw' }} src={photo} />
                            </IonCol>
                        </IonRow>}
                    </div>



                    {/* <IonRow>
                        <IonCol>
                            <IonLabel color="primary" style={{ fontSize: '1em' }}>
                                Cuando termines, por favór, regresá y cargá el comprobante del envío de dinero.
                            </IonLabel>
                            <IonButton color='secondary' expand='block' onClick={uploadPhoto}>CARGAR COMPROBANTE</IonButton>
                        </IonCol>
                    </IonRow> */}

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
                                disabled={!photo}
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
            <IonModal isOpen={showDatos} onIonModalDidDismiss={() => setShowDatos(false)}>
                <IonHeader>
                    <IonToolbar color='secondary'>
                        <IonTitle>Datos Transferencia</IonTitle>
                        <IonButton slot='end' fill='clear' onClick={() => setShowDatos(false)}>
                            <IonIcon color='light' icon={closeCircleSharp} style={{ fontSize: '1.8em' }}></IonIcon>
                        </IonButton>
                    </IonToolbar>
                </IonHeader>
                <IonContent className='ion-padding-top'>
                    <IonRow>
                        <IonCol>
                            <IonItemDivider>Teléfono</IonItemDivider>

                            <IonItem lines='none'>
                                <IonLabel>
                                    <strong>+5491130647410</strong>
                                </IonLabel>
                                <IonButton fill='clear' color='mp' onClick={() => {
                                    setShowToast(true);
                                    navigator.clipboard.writeText("5491130647410")
                                }}>copiar</IonButton> <br />
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItemDivider>Email</IonItemDivider>

                            <IonItem lines='none'>
                                <IonLabel>
                                    <strong>juanmanuelcavilla@gmail.com</strong>
                                </IonLabel>
                                <IonButton fill='clear' color='mp' onClick={() => {
                                    setShowToast(true);
                                    navigator.clipboard.writeText("juanmanuelcavilla@gmail.com")
                                }}>copiar</IonButton>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItemDivider>CVU</IonItemDivider>
                            <IonItem lines='none'>
                                <IonLabel>
                                    <strong>0000003100065932043343</strong>
                                </IonLabel>
                                <IonButton fill='clear' color='mp' onClick={() => {
                                    setShowToast(true);
                                    navigator.clipboard.writeText("0000003100065932043343")
                                }}>copiar</IonButton>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItemDivider>Alías</IonItemDivider>
                            <IonItem lines='none'>
                                <IonLabel>
                                    <strong>nanofrc.mp</strong>
                                </IonLabel>
                                <IonButton fill='clear' color='mp' onClick={() => {
                                    setShowToast(true);
                                    navigator.clipboard.writeText("nanofrc.mp")
                                }}>copiar</IonButton>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonImg style={{ height: '60vw' }} src={`${process.env.PUBLIC_URL}/assets/images/mp-logo.png`}/>
                        </IonCol>
                    </IonRow>
                </IonContent>
                <IonFooter mode='ios' style={{ width: '100vw' }}>
                <IonToolbar mode='ios' color="secondary" >
                    <IonRow>
                        <IonCol>
                            <IonButton color='mp' expand='block' fill='solid' onClick={openMP}>IR A MERCADO PAGO</IonButton>
                        </IonCol>
                    </IonRow>

                </IonToolbar>
            </IonFooter>
            </IonModal>
        </div>
    );
};

export default SlideRifaThree;
