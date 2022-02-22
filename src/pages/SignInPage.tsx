import { IonAlert, IonBackButton, IonButton, IonButtons, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonPage, IonRow, IonSlide, IonSlides, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import axios from 'axios';
import { arrowForward } from 'ionicons/icons';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Status } from '../interfaces';
import { setSocioData } from '../store/socio/socio.actions';
import { uiHideSignIn } from '../store/ui/ui.actions';
import { setUserAction } from '../store/user/user.actions';
import SlideOne from './slides/SlideOne';
import SlideThree from './slides/SlideThree';
import SlideTwo from './slides/SlideTwo';
import SlideTwoUser from './slides/SlideTwoUser';

const SignInPage = () => {
    const [showAlert, setShowAlert] = useState(false)
    const [present, dismiss] = useIonLoading();
    const dispatch = useDispatch();
    const history = useHistory();
    const [user, setUser] = useState({
        nombre: '',
        apellido: '',
        edad: '',
        nacimiento: '',
        dni: '',
        sexo: '',
        photo: '',
        telefono: '',
        email: '',
        password: ''
    });
    const mySlides = useRef(null);
    const slideOpts = {
        initialSlide: 0,
        speed: 400
    };

    const onBtnClicked = async (direction: string, data: any) => {
        const swiper = await mySlides.current.getSwiper();
        if (direction === "next") {
            if(data){
                setUser({
                    ...user,
                    ...data
                })
            }
            swiper.slideNext();
        } else if (direction === "prev") {
            swiper.slidePrev();
        } else if( direction === 'end' ){
            user.photo = data.photo;
            console.log('usuario', user);
            
            present()
            try {
                
                const res = await axios.post(`http://localhost:4000/hurricanes/api/auth/new`,{
                    email: user.email,
                    password: user.password 
                })
                console.log(res)
                const resSocio = await axios.post(`http://localhost:4000/hurricanes/api/socio/new`,{
                    
                    "user_id":res.data.uid,
                    "nombre":user.nombre,
                    "apellido":user.apellido,
                    "sexo":user.sexo,
                    "dni":user.dni,
                    "fecha_nac":user.nacimiento,
                    "categoria":"S",
                    "socioHuracan":false,
                    "activo":false,
                    "telefono":user.telefono,
                    "foto":user.photo

                })
                setUser({
                    ...user
                })
                const socioData = {
                    user_id: res.data.uid,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    sexo: user.sexo,
                    dni: user.dni,
                    fecha_nac: user.nacimiento,
                    categoria: 'S',
                    socioHuracan: false,
                    activo: Status.Inactivo,
                    telefono: user.telefono,
                    foto: `${process.env.PUBLIC_URL}/assets/images/selfie.jpg`
                }
                dispatch(setSocioData(socioData))
                // history.replace('login');
                dispatch(uiHideSignIn())
            } catch (error) {
                console.log(error)
                setShowAlert(true)
            }finally{
                dismiss();
            }
        }
    };

    return (
        <IonPage>
            <IonContent>
                <IonSlides ref={mySlides} draggable={false} options={slideOpts} style={{ height: '100%' }}>
                    <IonSlide  style={{ height: '100%' }}>
                        <SlideOne onBtnClicked={onBtnClicked} />
                    </IonSlide>
                    <IonSlide style={{ height: '100%' }}>
                        <SlideTwo onBtnClicked={onBtnClicked} />
                    </IonSlide>
                    <IonSlide  style={{ height: '100%' }}>
                        <SlideTwoUser onBtnClicked={onBtnClicked}/>
                    </IonSlide>
                    <IonSlide  style={{ height: '100%' }}>
                        <SlideThree onBtnClicked={onBtnClicked} />
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
    );
};

export default SignInPage;
