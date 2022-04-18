import { IonAlert, IonButton, IonContent, IonHeader, IonIcon, IonPage, IonSlide, IonSlides, IonTitle, IonToolbar, useIonLoading } from '@ionic/react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchSinToken } from '../../helpers/fetch';
import { startGetAvailableNumbers } from '../../store/evento/evento.actions';
import SlideRifaFour from '../slides/SlideRifaFour';
import SlideRifaOne from '../slides/SlideRifaOne';
import SlideRifaThree from '../slides/SlideRifaThree';
import SlideRifaTwo from '../slides/SlideRifaTwo';

const TabRifa = () => {
    const dispatch = useDispatch();
    const mySlides = useRef(null);
    const [showAlert, setShowAlert] = useState(false);
    const [rifa, setRifa] = useState<any>();
    const [present, dismiss] = useIonLoading();
    const slideOpts = {
        initialSlide: 0,
        speed: 400,
        draggable: false
    };
    const [socio, setSocio] = useState({
        name: '',
        email: '',
        tel: '',
        numeros: [],
        comprobante: '',
        id_rifa: ''
    });
    const onBtnClicked = async (direction: string, data?: any) => {
        debugger
        const swiper: any = await mySlides.current.getSwiper();
        if (direction === "next") {
            debugger
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
            present()
            socio.comprobante = data.comprobante;
            socio.id_rifa = rifa._id;
            try {
                const resp = await fetchSinToken('rifa/newTicket', socio, 'POST');
                const data = await resp.json();

                if(data.ok){
                    dismiss()
                    swiper.slideNext();
                }else{
                    dismiss()
                    setShowAlert(true)
                }
            } catch (error) {
                dismiss()
                setShowAlert(true)
            }
        }
    };

    const getRifas = async () => {
        try {
            const resp = await fetchSinToken(`rifa/`);
            const data = await resp.json();

            console.log(data)
            if (data.ok) {
                setRifa(data.rifa);
                dispatch(startGetAvailableNumbers(data.rifa))
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getRifas();
    }, [])
    return (
        <IonPage>
            <IonContent>
                <IonSlides ref={mySlides} draggable={false}  options={slideOpts} style={{ height: '100%' }}>
                    <IonSlide style={{ height: '100%' }}>
                        {/* <SlidePersonalData onBtnClicked={onBtnClicked} rifa={rifa}/> */}
                        <SlideRifaOne onBtnClicked={onBtnClicked} rifa={rifa}/>
                    </IonSlide>
                    <IonSlide style={{ height: '100%' }}>
                        <SlideRifaTwo onBtnClicked={onBtnClicked} rifa={rifa} />
                    </IonSlide>
                    <IonSlide style={{ height: '100%' }}>
                        <SlideRifaThree onBtnClicked={onBtnClicked} rifa={rifa} quantity={socio.numeros.length} />
                    </IonSlide>
                    <IonSlide style={{ height: '100%' }}>
                        <SlideRifaFour onBtnClicked={onBtnClicked} numbers={socio?.numeros} />
                    </IonSlide>
                </IonSlides>
            </IonContent>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => {setShowAlert(false); dispatch(startGetAvailableNumbers(rifa)); onBtnClicked('prev')}}
                cssClass='my-custom-class'
                header={'Alguno de los números seleccionados ya estan reservados. Actualizaremos los numeros. Aguardá por favor.'}
                buttons={['OK']}
            />
        </IonPage>
    )
}

export default TabRifa