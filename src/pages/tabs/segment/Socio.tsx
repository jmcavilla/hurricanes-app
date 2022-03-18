import { IonButton, IonCol, IonFabButton, IonIcon, IonImg, IonItem, IonModal, IonRow, IonText } from '@ionic/react';
import { alertCircleSharp, closeCircleSharp, pencilSharp } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import ModalChangePhoto from '../../../components/modals/ModalChangePhoto';
import { TipoSocio } from '../../../interfaces';

interface Props {
    socio: any
}

const Socio: React.FC<Props> = ({ socio }) => {
    const [showChangePhoto, setShowChangePhoto] = useState(false);
    const [style, setStyle] = useState({});
    const [tipoSocio, setTipoSocio] = useState('');

    const getTipoSocio = () => {
        switch (socio.tipo_socio) {
            case TipoSocio.Jugador:
                debugger
                if(socio.socio_huracan){
                    setStyle({ background: 'linear-gradient(0deg, rgba(234,31,31,1) 2.5%, rgba(255,255,255,1) 5%, rgba(255,255,255,1) 95%, rgba(234,31,31,1) 97.5%)' })
                }else{
                    setStyle({ background: 'linear-gradient(220deg, #FCBF28, #E95203)' })
                }
                setTipoSocio('Jugador')
                return 'Jugador'
            case TipoSocio.Especial:
                setTipoSocio('Especial')
                return 'Especial'
            case TipoSocio.Normal:
                if(socio.socio_huracan){
                    setStyle({ background: 'linear-gradient(0deg, rgba(234,31,31,1) 2.5%, rgba(255,255,255,1) 5%, rgba(255,255,255,1) 95%, rgba(234,31,31,1) 97.5%)' })
                }else{
                    setStyle({ background: 'linear-gradient(220deg, #FCBF28, #E95203)' })
                }
                setTipoSocio('Normal')
                return 'Normal'
            case TipoSocio.Staff:
                setTipoSocio('Staff')
                setStyle({ background: 'linear-gradient(220deg, #DBDBDB, #8F8F8F)' })
                return 'Staff'
            case TipoSocio.Fundador:
                setTipoSocio('Fundador')
                setStyle({ background: 'linear-gradient(220deg, #EFB810, #EFB810)' })
                return 'Staff'
            default:
                setTipoSocio('')
                setStyle({ background: 'linear-gradient(220deg, #FCBF28, #E95203)' })
                return ''
        }
    }

    const getCategoria = () => {
        switch (socio.categoria) {
            case 'V':
                return 'Veteranos';
            case 'S':
                return 'Superior';
            case 'M':
                return 'Juveniles';
            case 'I':
                return 'Infantiles';
            default:
                break;
        }
    }

    useEffect(() => {
        getTipoSocio()
    }, [])


    return (
        <>
            <IonRow>
                <IonCol style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className='user__img' style={{ backgroundImage: `url(${socio?.foto})` }}>
                    </div>
                </IonCol>
            </IonRow>
            <IonRow>
            <IonCol size='12' style={{ padding: '0 10vw' }}>
                    <IonButton expand='block' fill='clear' color='secondary' onClick={() => { setShowChangePhoto(true) }}>
                        <IonIcon src={pencilSharp} />
                    </IonButton>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol size='12'>
                    <div className='user__card-container'>
                        <div className='socio__card' style={style}>
                            <div className='user__card-contain'>
                                <h5>{socio?.numero_socio && ('0000' + socio?.numero_socio).slice(-4)} - {tipoSocio}</h5>
                                <h4 className='user__name'>{socio?.apellido}, {socio?.nombre}</h4>
                                {socio?.activo && socio.tipo_socio === TipoSocio.Jugador && <p>Categoría: {getCategoria()}</p>}
                                <p><strong>{socio?.status === 'Inactive' ? 'INACTIVO' : 'ACTIVO'}</strong></p>
                            </div>
                            <div className='user__img-container'>
                                <div className=''>
                                    <IonImg
                                        className="user__card-img"
                                        src={`${process.env.PUBLIC_URL}/assets/images/hurricanes_logo.png`}
                                    />
                                </div>
                                {socio.socio_huracan && <div className=''>
                                    <IonImg
                                        className="user__card-img"
                                        src={`${process.env.PUBLIC_URL}/assets/images/huracan_logo.png`}
                                    />
                                </div>}
                            </div>
                        </div>
                    </div>
                </IonCol>
            </IonRow>
            {
                socio?.status === 'Pending' &&
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
                socio?.status === 'Inactive' &&
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
            {
                socio?.status === 'Rejected' &&
                <IonRow>
                    <IonCol>
                        <IonItem color='danger'>
                            <IonIcon slot='start' icon={closeCircleSharp}></IonIcon>
                            <IonText>
                                {socio?.sexo === 'M' ? `Fuiste dado de baja como socio` : `Fuiste dada de baja como socia`}. 
                                Por favor, ponete en contacto con el club para mas información.
                            </IonText>
                        </IonItem>
                    </IonCol>
                </IonRow>
            }
            <IonModal isOpen={showChangePhoto}>
                <ModalChangePhoto dismiss={() => { setShowChangePhoto(false) }} socio={socio}/>
            </IonModal>
        </>
    );
};

export default Socio;
