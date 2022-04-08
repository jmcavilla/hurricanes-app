import { IonButton, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonSpinner, IonTitle, IonToolbar } from '@ionic/react'
import { cameraSharp, closeCircleSharp, imagesSharp, personSharp } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { Camera, CameraResultType, CameraDirection, CameraSource } from '@capacitor/camera';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseLoading, uiHideLogin, uiOpenLoading, uiSetError, uiShowLogin } from '../../store/ui/ui.actions';
import { RootState } from '../../store';
import { fetchConToken } from '../../helpers/fetch';
const ModalChangePhoto = ({ dismiss, socio }) => {
    const { loading } = useSelector((state: RootState) => state.ui);
    const [photo, setPhoto] = useState(null);
    const dispatch = useDispatch();
    const guardarSocio = async () => {
        dispatch(uiOpenLoading())
        try {
            socio.foto = photo;
            const resp = await fetchConToken('socio/save', {...socio}, 'PUT');
            const body = await resp.json();

            dispatch(uiCloseLoading())
            if(body.ok){
                dismiss();
            }else{
                dispatch(uiHideLogin())
                dispatch(uiSetError({
                    code: 400,
                    message: 'No se pudo actualizar la imagen'
                }))
            }
            
        } catch (error) {
            dispatch(uiCloseLoading())
            dispatch(uiSetError({
                code: 400,
                message: 'No se pudo actualizar la imagen'
            }))
        }
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

    useEffect(() => {
        setPhoto(socio.foto)
    }, [])
    
    return (
        <>
            <IonHeader>
                <IonToolbar color='secondary'>
                    <IonTitle>Cambiar Foto</IonTitle>
                    <IonButton slot='end' fill='clear' onClick={dismiss}>
                        <IonIcon color='light' icon={closeCircleSharp} style={{ fontSize: '1.8em' }}></IonIcon>
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                {
                    !loading ?
                        <>
                            <div style={{ padding: '10vw' }}>

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
                                    <IonButton className='photo-button' expand="block" fill="outline" color='primary' onClick={uploadPhoto}>
                                        <div>
                                            <IonIcon src={imagesSharp} />
                                            <p color='light'>
                                                Subir foto
                                            </p>
                                        </div>
                                    </IonButton>
                                </div>
                            </div>
                            <div style={{ padding: '0vh 10vw 0 10vw', flex: 1 }}>
                                <IonCardSubtitle color="primary" style={{ fontSize: '1em' }}>
                                    Recordá tener buena iluminación para que se vea bien tu cara a la hora de sacarte la foto, esta foto será utilizada en el carnét del club.
                                </IonCardSubtitle>
                            </div>
                            <div style={{ padding: '5vh 10vw', flex: 1 }}>
                                <IonButton expand='block' fill='outline' color='secondary' onClick={guardarSocio}>guardar</IonButton>
                            </div>
                        </>
                        :
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <IonSpinner />
                        </div>
                }
            </IonContent>
        </>
    )
}

export default ModalChangePhoto