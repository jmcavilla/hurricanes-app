import { IonAlert, IonButton, IonContent, IonHeader, IonIcon, IonPage, IonSlide, IonSlides, IonTitle, IonToolbar } from '@ionic/react';
import { closeCircleSharp } from 'ionicons/icons';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SlideThree from './SlideThree';
import SlideTwo from './SlideTwo';
import SlideOne from './SlideOne';
import { createFamily, createSocio } from '../../store/socio/socio.actions';
import { RootState } from '../../store';
import { uiHideFieldsSocio } from '../../store/ui/ui.actions';

const SocioSlides = ({ parent = false, close}) => {
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
            swiper.slideNext();
        } else if (direction === "prev") {
            swiper.slidePrev();
        } else if (direction === 'end') {
            socio.foto = data.photo;

            setCategoria();
            if(parent){
                socio.parent_id = user.uid;
                dispatch(createFamily(socio));
            }else{
                dispatch(createSocio(socio))
            }
        }
    };


    const setCategoria = () => {
        const edad = parseInt(socio.edad)
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
                        <SlideOne parent={parent} onBtnClicked={onBtnClicked} />
                    </IonSlide>
                    <IonSlide style={{ height: '100%' }}>
                        <SlideTwo parent={parent} onBtnClicked={onBtnClicked} />
                    </IonSlide>
                    <IonSlide style={{ height: '100%' }}>
                        <SlideThree parent={parent} onBtnClicked={onBtnClicked} />
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