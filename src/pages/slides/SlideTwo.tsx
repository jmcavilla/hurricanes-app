import { IonAlert, IonButton, IonCardSubtitle, IonCardTitle, IonCol, IonDatetime, IonFooter, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonPopover, IonRow, IonText, IonToolbar } from '@ionic/react';
import { arrowBack, arrowForward, calendar, closeCircleSharp, man, woman } from 'ionicons/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Gender } from '../../interfaces';
import { RootState } from '../../store';
import { format, parseISO } from 'date-fns';
import DatePicker from 'react-mobile-datepicker';
import { uiHideSignIn, uiShowSignInParent } from '../../store/ui/ui.actions';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser';

const SlideTwo = ({ onBtnClicked, parent = false }) => {
    const dispatch = useDispatch();
    const [dateOpen, setDateOpen] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [nombre, setNombre] = useState(null)
    const [apellido, setApellido] = useState(null)
    const [dni, setDni] = useState(null);
    const [edad, setEdad] = useState(null)
    const [sexo, setSexo] = useState(null)
    const [telefono, setTelefono] = useState(null)
    const [nacimiento, setNacimiento] = useState('');
    const next = () => {
        
        onBtnClicked("next", {
            nombre,
            apellido,
            dni,
            edad,
            sexo,
            nacimiento,
            telefono
        });
    }
    const monthMap = {
        '1': 'Ene',
        '2': 'Feb',
        '3': 'Mar',
        '4': 'Abr',
        '5': 'May',
        '6': 'Jun',
        '7': 'Jul',
        '8': 'Ago',
        '9': 'Sep',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Dec',
    };
    const dateConfig = {
        'date': {
            format: 'DD',
            caption: 'Day',
            step: 1,
        },
        'month': {
            format: value => monthMap[value.getMonth() + 1],
            caption: 'Mon',
            step: 1,
        },
        'year': {
            format: 'YYYY',
            caption: 'Year',
            step: 1,
        },
    }
    const formatDate = (value: Date) => {
        setDateOpen(false);
        setNacimiento(format(value, 'dd/MM/yyyy'));
        const age = getAge(value);
        setEdad(age);
        if(age < 18){
            setShowAlert(true);
        }
    };
    const getAge=(birthDate) => {
        var today = new Date();
        // var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    const close = () => {
        dispatch(uiHideSignIn());
    }

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
           { !parent ? 
           <>
                <div style={{ flex: 1, padding: '10vw 0 0 0' }}>
                    <IonCardTitle color="primary" style={{ fontSize: '1.5em' }}>
                        Completá tus datos
                    </IonCardTitle>
                    <IonCardSubtitle color="primary" style={{ fontSize: '1em' }}>
                        Necesitamos algunos datos personales
                    </IonCardSubtitle>
                </div>
                <div style={{ padding: '2vw', flex: 5 }}>
                    <IonRow>
                        <IonCol>
                            <IonItem color="">
                                <IonLabel position="floating">Nombre</IonLabel>
                                <IonInput autocomplete='off' value={nombre} autocapitalize='on' onIonChange={e => setNombre(e.detail.value)}></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem color="">
                                <IonLabel position="floating">Apellido</IonLabel>
                                <IonInput autocomplete='off' value={apellido} autocapitalize='on' onIonChange={e => setApellido(e.detail.value)}></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem color="">
                                <IonLabel position="floating">DNI</IonLabel>
                                <IonInput autocomplete='off' value={dni} autocapitalize='on' onIonChange={e => setDni(e.detail.value)}></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem color="">
                                <IonLabel position="floating">Teléfono</IonLabel>
                                <IonInput autocomplete='off' value={telefono} autocapitalize='on' onIonChange={e => setTelefono(e.detail.value)}></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem color="">
                                <IonLabel position="floating">Fecha de nacimiento</IonLabel>
                                <IonInput autocomplete='off' value={nacimiento} onClick={() => { setDateOpen(true) }} autocapitalize='on'></IonInput>
                            </IonItem>

                            <DatePicker
                            theme="android"
                                dateConfig={dateConfig}
                                isOpen={dateOpen}
                                confirmText="Aceptar"
                                cancelText="Cancelar"
                                onSelect={formatDate}
                                onCancel={() => { setDateOpen(false) }}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem color="">
                                <IonLabel position="floating">Edad</IonLabel>
                                <IonInput value={edad} autocapitalize='on' disabled={true}></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton
                                expand="full"
                                color={sexo === Gender.Male ? 'secondary' : 'light'}
                                onClick={ () => setSexo( Gender.Male ) }
                                style={{ height: '15vh' }}
                            >
                                Hombre<IonIcon icon={man} size="large" />
                            </IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton
                                expand="full"
                                color={sexo === Gender.Female ? 'secondary' : 'light'}
                                onClick={ () => setSexo( Gender.Female ) }
                                style={{ height: '15vh' }}
                            >
                                <IonIcon icon={woman} size="large" />
                                mujer
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </div>
                <IonFooter mode='ios' style={{ width: '100vw' }}>
                    <IonToolbar mode='ios' color="secondary" >
                        <IonRow>
                            <IonCol>
                                <IonButton
                                mode='ios'
                                    expand="full"
                                    fill="clear"
                                    color='light'
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
                                    onClick={next}
                                    disabled={!sexo || !nombre || !apellido || !edad}
                                >
                                    Siguiente <IonIcon icon={arrowForward} />
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
                                InAppBrowser.create('https://www.instagram.com/hurricanes_rugbyba/','_system')
                            }
                        },
                    ]}
                />
            </>
            :
            <>
            </>
            }
        </div>
    );
};

export default SlideTwo;