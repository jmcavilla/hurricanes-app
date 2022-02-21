import { IonButton, IonCard, IonCardSubtitle, IonCol, IonContent, IonIcon, IonImg, IonItem, IonItemDivider, IonLabel, IonRow, IonText } from '@ionic/react';
import { alertCircleSharp, closeCircleSharp } from 'ionicons/icons';
import React from 'react';
import { ISocio } from '../../../interfaces';
import { User } from '../../../store/user/user.reducer';

interface Props {
    socio: any
}

const Socio: React.FC<Props> = ({ socio }) => {


    return (
        <IonContent>
            <IonRow>
                <IonCol style={{ display: 'flex', justifyContent: 'center'}}>
                    <div className='user__img' style={{ backgroundImage: `url(${socio?.foto})` }}>
                    </div>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol size='12'>
                    <div className='user__card-container'>
                        <div className='user__card'>
                            <div className='user__card-contain'>
                                <h3>{socio?.numeroSocio && ('00000000' + socio?.numeroSocio).slice(-8)}</h3>
                                <h3 className='user__name'>{socio?.apellido}, {socio?.nombre}</h3>
                                {socio?.activo && <p>Socio {socio?.categoria}</p>}
                                <p>Socio <strong>{socio?.activo ? 'ACTIVO' : 'INACTIVO'}</strong></p>
                            </div>
                            <div className=''>
                            <IonImg
                            
                                className="user__card-img"
                                src={`${process.env.PUBLIC_URL}/assets/images/hurricanes_logo.png`}
                            />
                            </div>
                        </div>
                    </div>
                </IonCol>
            </IonRow>
            {
                !socio?.activo && !socio?.numeroSocio && 
                <IonRow>
                    <IonCol>
                        <IonItem color='tertiary'>
                            <IonIcon slot='start' icon={alertCircleSharp}></IonIcon>
                            <IonText>
                                Todavía no hemos confirmado tus datos. En breve terminaremos de procesarlos.
                            </IonText>
                        </IonItem>
                    </IonCol>
                </IonRow>
            }
            {
                !socio?.activo && socio?.numeroSocio && 
                <IonRow>
                    <IonCol>
                        <IonItem color='danger'>
                            <IonIcon slot='start' icon={closeCircleSharp}></IonIcon>
                            <IonText>
                                Hemos encontrado problemas con tu usuario. Por favor, ponete en contacto con el club para solucionarlo.
                            </IonText>
                        </IonItem>
                    </IonCol>
                </IonRow>
            }
        </IonContent>
    );
};

export default Socio;
