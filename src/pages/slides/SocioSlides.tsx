import { IonAlert, IonButton, IonContent, IonHeader, IonIcon, IonPage, IonSlide, IonSlides, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import { closeCircleSharp } from 'ionicons/icons';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SlideThree from './SlideThree';
import SlideTwo from './SlideTwo';
import SlideOne from './SlideOne';
import { createFamily, createSocio, getFamily, getSocioData } from '../../store/socio/socio.actions';
import { RootState } from '../../store';
import { uiCloseLoading, uiHideAddFamily, uiHideFieldsSocio, uiHideFieldsSocioAdmin, uiHideSignIn, uiOpenLoading, uiSetError } from '../../store/ui/ui.actions';
import { fetchConToken } from '../../helpers/fetch';
import { Gender } from '../../interfaces';

const SocioSlides = ({ parent = false, admin = false, close}) => {
    const [present, dismiss] = useIonLoading()
    const { user } = useSelector((state: RootState) => state.user);
    const mySlides = useRef(null);
    const dispatch = useDispatch();
    const [showAlert, setShowAlert] = useState(false)
    const slideOpts = {
        initialSlide: 0,
        speed: 400
    };

    const [socio, setSocio] = useState({
        nombre: '',
        apellido: '',
        edad: '',
        fecha_nac: '',
        dni: '',
        sexo: '',
        foto: '',
        telefono: '',
        socio_huracan: false,
        categoria: '',
        user_id: user.uid,
        numero_socio: null,
        parent_id: null
    });
    const onBtnClicked = async (direction: string, data: any) => {
        const swiper = await mySlides.current.getSwiper();
        if (direction === "next") {
            if (data) {
                setSocio({
                    ...socio,
                    ...data
                })
            }
            if(swiper.activeIndex === 0){
                present();
                const resp = await fetchConToken('socio/socioByDni', data, 'POST');
                const body = await resp.json()

                if(body.ok){
                    let socioExistente = body.socio;
                    socioExistente.user_id = user.uid;
                    if(parent){
                        socioExistente.parent_id = user.uid;
                    }
                    guardarSocio(socioExistente, parent)
                }
                dismiss()
            }
            swiper.slideNext();
        } else if (direction === "prev") {
            swiper.slidePrev();
        } else if (direction === 'end') {
            socio.foto = data.photo;

            setCategoria();
            if(parent){
                socio.parent_id = user.uid;
                dispatch(createFamily(socio));
            }else if(parent){
                socio.user_id = null;
                dispatch(createSocio(socio));
            }else{
                dispatch(createSocio(socio))
            }
        }
    };

    const guardarSocio = async (socio, parent = false) => {
        try {
            const resp = await fetchConToken('socio/save', {...socio}, 'PUT');
            const body = await resp.json();

            if(body.ok){
                if(parent){
                    dispatch(uiHideFieldsSocio())
                    dispatch(uiHideSignIn());
                    dispatch(uiCloseLoading());
                    dispatch(uiHideAddFamily());
                    dispatch(getFamily(socio.user_id));
                }else{
                    dispatch(uiHideFieldsSocioAdmin());
                    dispatch(uiHideFieldsSocio())
                    dispatch(uiHideSignIn());
                    dispatch(uiCloseLoading());
                    dispatch(getSocioData(socio.user_id));
                }
            }
            
        } catch (error) {
            dispatch(uiCloseLoading())
            dispatch(uiSetError({
                code: 400,
                message: 'Ocurrion un error, intentalo nuevamente.'
            }))
        }
    }

    const setCategoria = () => {
        const edad = parseInt(socio.edad)
        if(socio.sexo === Gender.Female){
            if(edad > 13){
                socio.categoria = 'F';
            }else{
                socio.categoria = 'I'
            }
            return;
        }
        if( edad > 35 ){
            socio.categoria = 'V';
        }else if( edad > 19 ){
            socio.categoria = 'S';
        }else if( edad > 13 ){
            socio.categoria = 'J'
        }else{
            socio.categoria = 'I'
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color='secondary'>
                    <IonTitle>Datos Asociado</IonTitle>
                    <IonButton slot='end' fill='clear' onClick={close}>
                        <IonIcon color='light' icon={closeCircleSharp} style={{ fontSize: '1.8em' }}></IonIcon>
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonSlides ref={mySlides} draggable={false} options={slideOpts} style={{ height: '100%' }}>
                    <IonSlide style={{ height: '100%' }}>
                        <SlideOne parent={parent} admin={admin} onBtnClicked={onBtnClicked} />
                    </IonSlide>
                    <IonSlide style={{ height: '100%' }}>
                        <SlideTwo parent={parent} admin={admin} onBtnClicked={onBtnClicked} />
                    </IonSlide>
                    <IonSlide style={{ height: '100%' }}>
                        <SlideThree parent={parent} admin={admin} onBtnClicked={onBtnClicked} />
                    </IonSlide>
                </IonSlides>
            </IonContent>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                cssClass='my-custom-class'
                header={'Ocurrio un error, por favor intentelo nuevamente.'}
                buttons={['OK']}
            />
        </IonPage>
    )
}

export default SocioSlides