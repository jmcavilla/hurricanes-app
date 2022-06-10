import { IonButton, IonCard, IonCardContent, IonCardTitle, IonChip, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonLabel, IonModal, IonRow, IonSegment, IonSegmentButton, IonSlide, IonSlides, IonTitle, IonToast, IonToolbar } from '@ionic/react'
import { closeCircleSharp } from 'ionicons/icons'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Socio from '../pages/tabs/segment/Socio'
import { RootState } from '../store'
import { startGetCuotasSocio } from '../store/cuota/cuota.actions'
import 'moment/locale/es';
import { uiHideAddFamily, uiHideFieldsSocio, uiShowAddFamily, uiShowFieldsSocio } from '../store/ui/ui.actions'
import SocioSlides from '../pages/slides/SocioSlides'
const Carnet = () => {
    const { data: socio, familia } = useSelector((state: RootState) => state.socio);
    const { cuotas } = useSelector((state: RootState) => state.cuota);
    const { showAddFamily, showFieldsSocio } = useSelector((state: RootState) => state.ui);
    const [showToastCuotas, setShowToastCuotas] = useState(false);
    const [familySelected, setFamilySelected] = useState(null);
    const [showCuotasFamily, setShowCuotasFamily] = useState(false);
    const [showCuotas, setShowCuotas] = useState(false);
    const [segment, setSegment] = useState('S');
    const slideOpts = {
        initialSlide: 0,
        speed: 400
    };
    const dispatch = useDispatch();
    moment.locale('es');
    useEffect(() => {
        if (socio) {
            dispatch(startGetCuotasSocio(socio._id))
        }
    }, [dispatch])

    useEffect(() => {

        if (!socio) {
            setSegment('F');
        }

    }, [familia])

    useEffect(() => {
        console.log('first')
        let cuotasPending = 0;
        if(cuotas){

            for (let index = 0; index < cuotas?.length; index++) {
                const element = cuotas[index];
                if(element.status === "Pending"){
                    cuotasPending += 1;
                }
            }
            
            if(cuotasPending > 1){
                setShowToastCuotas(true)
            }
        }

    }, [cuotas])

    const addFamily = () => {
        console.log('first')
        dispatch(uiShowAddFamily());
    }

    const searchFamilyCuota = (fam) => {
        dispatch(startGetCuotasSocio(fam._id))
    }

    const getSlides = () => {
        return (
            <>
            
            <IonSlides draggable={false} options={slideOpts} style={{ height: '100%' }}>
                {
                    familia.map((fam, i) => (
                        <IonSlide key={i} style={{ height: '100%' }}>
                            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', width: '100vw' }}>
                                <IonContent>
                                    <Socio socio={fam} />
                                    <IonRow style={{ marginTop: '10px' }}>
                                        {/* <IonCol>
                                            <div style={{ padding: '0 10vw' }}>
                                                <IonButton color='secondary' fill='outline' expand='block'> VER FICHA</IonButton>
                                            </div>
                                        </IonCol> */}
                                        {fam.status === 'Active' && <IonCol>
                                            <div style={{ padding: '0 10vw' }}>
                                                <IonButton color='secondary' fill='solid' expand='block' onClick={() => {
                                                    setShowCuotasFamily(true);
                                                    searchFamilyCuota(fam);
                                                }}> VER CUOTAS</IonButton>
                                            </div>
                                        </IonCol>}
                                    </IonRow>
                                </IonContent>
                            </div>
                        </IonSlide>
                    ))
                }
            </IonSlides>
            </>
        )
    }

    return (
        <>
            {socio && familia && familia.length > 0 && <IonSegment onIonChange={e => setSegment(e.detail.value)} value={segment}>
                <IonSegmentButton value="S">
                    {segment === 'S' ? <IonLabel color='primary'><strong>CARNÉT</strong></IonLabel> : <IonLabel>CARNÉT</IonLabel>}
                </IonSegmentButton>
                <IonSegmentButton value="F">
                    {segment === 'F' ? <IonLabel color='primary'><strong>FAMILIA</strong></IonLabel> : <IonLabel>FAMILIA</IonLabel>}
                </IonSegmentButton>
            </IonSegment>}
            {socio && segment === 'S' && <IonContent>
                {/* <IonRow>
                {showToastCuotas && <IonCol size='12' style={{  }}>
                        <IonCard className='ion-padding' color='tertiary'>
                            <IonLabel>
                                <strong> Tenés cuotas pendientes. Por favor, mantené tus cuotas al día</strong>
                            </IonLabel>
                        </IonCard>
                    </IonCol>}
                </IonRow> */}
                <Socio socio={socio} />
                <IonRow style={{ marginTop: '10px' }}>
                    
                    {socio.status === 'Active' && <><IonCol>
                        <div style={{ padding: '0 10vw' }}>
                            <IonButton color='secondary' fill='solid' expand='block' onClick={() => setShowCuotas(true)}> VER CUOTAS</IonButton>
                        </div>
                    </IonCol>
                    <IonCol>
                        <div style={{ padding: '0 10vw' }}>
                            <IonButton color='secondary' fill='outline' expand='block' onClick={addFamily}>AGREGAR FAMILIA</IonButton>
                        </div>
                    </IonCol></>}
                </IonRow>
                <IonModal isOpen={showAddFamily}>
                    <SocioSlides parent={true} close={() => {
                        dispatch(uiHideAddFamily());
                    }}></SocioSlides>
                </IonModal>
            </IonContent>}
            {segment === 'F' &&
                <>
                    
                    {
                        familia && familia.length > 0 && getSlides()
                    }
                    {
                        !socio &&
                        <>
                        <IonFooter>
                            <IonToolbar color='light'>
                                <IonButton color='secondary' fill='clear' expand='block' onClick={() => { dispatch(uiShowFieldsSocio()) }}> ASOCIATE </IonButton>
                            </IonToolbar>
                        </IonFooter>
                        <IonModal isOpen={showFieldsSocio}>
                            <SocioSlides close={() => {
                                dispatch(uiHideFieldsSocio());
                            }}></SocioSlides>
                        </IonModal>
                        </>
                        
                    }
                </>
            }
            <IonModal isOpen={showCuotas}>
                <IonHeader>
                    <IonToolbar color='secondary'>
                        <IonRow>
                            <IonCol size='8' style={{
                                justifyContent: 'start',
                                display: 'flex'
                            }}>
                                <IonTitle>Cuotas</IonTitle>
                            </IonCol>
                            <IonCol size='4' style={{
                                justifyContent: 'end',
                                display: 'flex'
                            }}>
                                <IonButton fill='clear' onClick={() => setShowCuotas(false)}>
                                    <IonIcon style={{ fontSize: '25px' }} color='light' icon={closeCircleSharp}></IonIcon>
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {
                        cuotas?.reverse().map((cuota, i) => (
                            <IonCard key={i}>
                                <IonCardContent>
                                    <IonRow>
                                        <IonCol size='4'>
                                            <IonLabel>
                                                <strong>{moment.months(cuota.mes - 1).toLocaleUpperCase()}</strong>
                                                <h3>${cuota.monto}</h3>
                                            </IonLabel>
                                        </IonCol>
                                        <IonCol size='8' style={{
                                            justifyContent: 'end',
                                            display: 'flex'
                                        }}>

                                            <IonChip color={cuota.status === 'Pending' ? 'danger' : 'success'}>
                                                <IonLabel >
                                                    {cuota.status === 'Pending' ? 'No pago' : 'Pagado'} {cuota.status === 'Accepted' && `- ${cuota.fecha_pago}`}
                                                </IonLabel>
                                            </IonChip>
                                        </IonCol>
                                    </IonRow>
                                </IonCardContent>
                            </IonCard>
                        ))
                    }
                </IonContent>
            </IonModal>
            <IonModal isOpen={showCuotasFamily}>
                <IonHeader>
                    <IonToolbar color='secondary'>
                        <IonRow>
                            <IonCol size='8' style={{
                                justifyContent: 'start',
                                display: 'flex'
                            }}>
                                <IonTitle>Cuotas</IonTitle>
                            </IonCol>
                            <IonCol size='4' style={{
                                justifyContent: 'end',
                                display: 'flex'
                            }}>
                                <IonButton fill='clear' onClick={() => setShowCuotasFamily(false)}>
                                    <IonIcon style={{ fontSize: '25px' }} color='light' icon={closeCircleSharp}></IonIcon>
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {
                        cuotas?.map((cuota, i) => (
                            <IonCard key={i}>
                                <IonCardContent>
                                    <IonRow>
                                        <IonCol size='4'>
                                            <IonLabel>
                                                <strong>{moment.months(cuota.mes - 1).toLocaleUpperCase()}</strong>
                                                <h3>${cuota.monto}</h3>
                                            </IonLabel>
                                        </IonCol>
                                        <IonCol size='8' style={{
                                            justifyContent: 'end',
                                            display: 'flex'
                                        }}>

                                            <IonChip color={cuota.status === 'Pending' ? 'danger' : 'success'}>
                                                <IonLabel >
                                                    {cuota.status === 'Pending' ? 'No pago' : 'Pagado'} {cuota.status === 'Accepted' && `- ${cuota.fecha_pago}`}
                                                </IonLabel>
                                            </IonChip>
                                        </IonCol>
                                    </IonRow>
                                </IonCardContent>
                            </IonCard>
                        ))
                    }
                </IonContent>
            </IonModal>
            <IonToast
                isOpen={showToastCuotas}
                onDidDismiss={() => setShowToastCuotas(false)}
                message="Tenés algunas cuotas pendientes de pago. Si no es así, comunicate con nosotros para regularizar la situación."
                color='danger'
                duration={5000}
            />
        </>
    )
}

export default Carnet