import { IonButton, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFooter, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonRow, IonToolbar } from '@ionic/react';
import { arrowBack, arrowForward } from 'ionicons/icons';
import React, { useState } from 'react';

const SlideTwo = ({ onBtnClicked, parent = false }) => {
    const [socioHuracan, setSocioHuracan] = useState(false)
    const [numeroSocioHuracan, setNumeroSocioHuracan] = useState(null);
    const next = () => {
        onBtnClicked("next", {
            socio_huracan: socioHuracan,
            numero_socio_huracan: numeroSocioHuracan
        });
    }
    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column',width: '100%' }}>
                <IonContent>

                
                <div>
                    <IonImg className='slides__img-huracan' src={process.env.PUBLIC_URL + '/assets/images/huracan_logo.png'}></IonImg>
                </div>
                <div style={{ flex: 1 }}>
                    <IonCardTitle color="primary" style={{ fontSize: '1.5em', padding: '10vw 0 10vw 0' }}>
                        {parent ? '¿Es socio/a de Huracán?' : '¿Sos socio de Huracán?'}
                    </IonCardTitle>
                    <IonCardSubtitle color="primary" style={{ padding: '0 10vw 10vw 10vw' }}>
                        {`Para poder realizar el descuento en la cuota necesitamos ${parent ? 'su' : 'tu'} número de socio del Club Atlético Huracán.`}
                    </IonCardSubtitle>
                    <IonRow>
                        <IonCol>
                            <IonButton
                                expand="full"
                                color={socioHuracan ? 'secondary' : 'light'}
                                onClick={() => setSocioHuracan(true)}
                                style={{ height: '15vh' }}
                            >
                                SI
                                {/* <IonIcon icon={man} size="large" /> */}
                            </IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton
                                expand="full"
                                color={!socioHuracan ? 'secondary' : 'light'}
                                onClick={() => setSocioHuracan(false)}
                                style={{ height: '15vh' }}
                            >
                                {/* <IonIcon icon={woman} size="large" /> */}
                                NO
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position='floating'>N° Socio</IonLabel>
                                <IonInput disabled={!socioHuracan} onIonChange={(e) => { setNumeroSocioHuracan(e.detail.value) }}></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                </div>
                </IonContent>
                <IonFooter mode='ios'>
                    <IonToolbar color="secondary" mode='ios'>
                        <IonRow>
                            <IonCol>
                                <IonButton
                                mode='ios'
                                    expand="full"
                                    fill="clear"
                                    color='light'
                                    // disabled={mySlides.current?.isEnd}
                                    onClick={() => { onBtnClicked("prev") }}
                                >
                                    <IonIcon icon={arrowBack} />Atrás
                                </IonButton>
                            </IonCol>
                            <IonCol>
                                <IonButton
                                mode='ios'
                                expand="full"
                                fill="clear"
                                    color='light'
                                    disabled={ (socioHuracan && !numeroSocioHuracan) }
                                    onClick={next}
                                >
                                    Siguiente <IonIcon icon={arrowForward} />
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonToolbar>
                </IonFooter>
            
        </div>
    );
};

export default SlideTwo;
