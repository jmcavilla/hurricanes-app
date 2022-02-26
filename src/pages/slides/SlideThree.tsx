import { IonButton, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFooter, IonIcon, IonImg, IonModal, IonRow, IonToolbar, useIonLoading } from '@ionic/react';
import { arrowBack, arrowForward, cameraSharp, closeCircleSharp, imagesSharp, personSharp } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setUserAction } from '../../store/user/user.actions';
import { CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions } from '@awesome-cordova-plugins/camera-preview';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera';
import axios from 'axios';
import { uiHideSignIn } from '../../store/ui/ui.actions';

const SlideThree = ({ onBtnClicked, parent = false  }) => {
    const dispatch = useDispatch()
    const [photo, setPhoto] = useState(null);

    const end = async () => {
        onBtnClicked('end', {
            photo
        })
    }

    const takePhoto = () => {

        const options: CameraOptions = {
            quality: 100,
            cameraDirection: 1,
            correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE
        }

        Camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            console.log('base64', imageData);
            setPhoto('data:image/jpeg;base64,' + imageData);
        }, (err) => {
            // Handle error
        });
    }

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* <div style={{ justifyContent: 'end', display: 'flex' }}>
                <IonButton fill='clear' onClick={close}>
                    <IonIcon style={{ fontSize: '25px'}} color='primary' icon={closeCircleSharp}></IonIcon>
                </IonButton>
            </div> */}
            <IonContent>

            <div style={{ padding: '10vw' }}>
                <IonCardTitle color="primary" style={{ fontSize: '1.5em' }}>
                    Último paso
                </IonCardTitle>
                <IonCardSubtitle color="primary" style={{ fontSize: '1em' }}>
                    Necesitamos una foto tuya para completar tu información.
                </IonCardSubtitle>
            </div>
            <div className='signin__action'>
                <>
                    {
                        photo ?
                            <div className='photo-rounded' style={{ backgroundImage: `url(${photo})` }}>
                            </div>
                            :
                            <IonIcon className='signin__take-img-icon' src={personSharp} />
                    }
                </>
                <div className='signing__photo-buttons'>
                    <IonButton className='photo-button' expand="block" fill="outline" color='primary' onClick={takePhoto}>
                        <div>
                            <IonIcon src={cameraSharp} />
                            <p color='light'>
                                Tomar foto
                            </p>
                        </div>
                    </IonButton>
                    {/* <IonButton className='photo-button' expand="block" fill="outline" color='primary' onClick={uploadPhoto}>
                        <div>
                        <IonIcon src={imagesSharp} />
                        <p color='light'>
                        Subir foto
                        </p>
                        </div>
                    </IonButton> */}
                </div>
            </div>
            <div style={{ padding: '0vh 10vw 0 10vw', flex: 1 }}>
                <IonCardSubtitle color="primary" style={{ fontSize: '1em' }}>
                    Recordá tener buena iluminación para que se vea bien tu cara a la hora de sacarte la foto, esta foto será utilizada en el carnét del club.
                </IonCardSubtitle>
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
                                // disabled={}
                                onClick={end}
                            >
                                Finalizar <IonIcon icon={arrowForward} />
                            </IonButton>
                        </IonCol>
                    </IonRow>

                </IonToolbar>
            </IonFooter>
        </div>
    );
};

export default SlideThree;
