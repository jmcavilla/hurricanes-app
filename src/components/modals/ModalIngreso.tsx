import { IonAlert, IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonTitle, IonToast, IonToolbar, useIonLoading } from '@ionic/react'
import { closeCircleSharp, documentAttachSharp, trashBinSharp } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import { Camera, CameraResultType, CameraDirection, CameraSource } from '@capacitor/camera';
import { useDispatch, useSelector } from 'react-redux';
import { uiSetError } from '../../store/ui/ui.actions';
import { RootState } from '../../store';
import moment from 'moment';
import { fetchConToken } from '../../helpers/fetch';
import { startGetEgresos, startGetIngresos } from '../../store/admin/admin.actions';

const ModalIngreso = ({ hide, tipo }) => {
    
    const { user } = useSelector((state: RootState) => state.user);
    const { data: socio } = useSelector((state: RootState) => state.socio);
    const [present, dismiss] = useIonLoading();
    const dispatch = useDispatch()
    const [concepto, setConcepto] = useState('');
    const [quien, setQuien] = useState('');
    const [monto, setMonto] = useState(null);
    const [comprobante, setComprobante] = useState('');
    const [showAlert, setShowAlert] = useState(false)
    const [showError, setShowError] = useState(false)
    const [error, setError] = useState(null)
    const [motivo, setMotivo] = useState('CUOTA')
    const takePhoto = async () => {

        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Base64,
            correctOrientation: true,
            direction: CameraDirection.Front,
            source: CameraSource.Camera
        })
        if (image) {
            setComprobante('data:image/jpeg;base64,' + image.base64String);
        } else {
            dispatch(uiSetError({
                code: 400,
                message: 'No se cargo la imagen'
            }))
        }

    }

    const uploadPhoto = async () => {
        const image = await Camera.getPhoto({
            quality: 40,
            allowEditing: false,
            resultType: CameraResultType.Base64,
            source: CameraSource.Photos
        })

        if (image) {
            setComprobante('data:image/jpeg;base64,' + image.base64String);
        } else {
            dispatch(uiSetError({
                code: 400,
                message: 'No se cargo la imagen'
            }))
        }
    }

    const create = async () => {
        // concepto: { type: String, require: true},
        // monto: { type: Number, require: true },
        // comprobante: { type: String },
        // tipo: { type: String, enum: ['Ingreso', 'Egreso'], require: true },
        // user_id: { type: String, require: true },
        // pago: { type: Boolean, default: false },
        // fecha: { type: String, require: true },
        // fecha_pago: { type: String }
        present();
        const data = {
            comprobante,
            concepto,
            monto,
            tipo: tipo,
            user_id: user.uid,
            quien,
            fecha: moment().format('DD/MM/YYYY'),
            motivo,
            mes: moment().month() + 1,
            anio: moment().year()
        }

        const resp = await fetchConToken('contable/new', {...data}, 'POST')
        const body = await resp.json();

        if(body.ok){
            dispatch(startGetIngresos());
            dispatch(startGetEgresos());
            dismiss();
            hide();
        }else{
            setError('Ocurrio un error. Por favor, intentelo nuevamente.');
            dismiss();
        }
    }

    useEffect(() => {
        setQuien(user.name || socio.nombre)
    }, [user])
    

    return (
        <>
            <IonHeader>
                <IonToolbar color='secondary'>
                    <IonTitle>Nuevo {tipo}</IonTitle>
                    <IonButton slot='end' fill='clear' onClick={hide}>
                        <IonIcon color='light' icon={closeCircleSharp} style={{ fontSize: '1.8em' }}></IonIcon>
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {
                <IonItem>
                    <IonLabel position='stacked'>{
                        tipo === 'Egreso' ?
                            '¿Quién hizo el gasto?'
                        :
                            '¿Quién ingresa el dinero?'
                    }</IonLabel>
                    <IonInput autocomplete='off' value={quien} onIonChange={e => setQuien(e.detail.value)}></IonInput>
                </IonItem>
                }
                <IonItem>
                    <IonLabel position='stacked'>Motivo</IonLabel>
                    {/* <IonInput value={tipoSocio} disabled={true}></IonInput> */}
                    <IonSelect
                        value={motivo}
                        okText="Aceptar"
                        cancelText="Cancelar"
                        onIonChange={e => {
                            setMotivo(e.detail.value);
                        }}
                    >
                        <IonSelectOption value='CUOTA'>Cuota</IonSelectOption>
                        <IonSelectOption value='ROPA'>Ropa</IonSelectOption>
                        <IonSelectOption value='OTRO'>Otro</IonSelectOption>
                    </IonSelect>
                </IonItem>
                {tipo !== 'Egreso' && motivo === 'OTRO' && <IonItem>
                    <IonLabel position='stacked'>Concepto</IonLabel>
                    <IonInput autocomplete='off' value={concepto} onIonChange={e => setConcepto(e.detail.value)}></IonInput>
                </IonItem>}
                {tipo === 'Egreso' && <IonItem>
                    <IonLabel position='stacked'>Concepto</IonLabel>
                    <IonInput autocomplete='off' value={concepto} onIonChange={e => setConcepto(e.detail.value)}></IonInput>
                </IonItem>}
                <IonItem>
                    <IonLabel position='stacked'>Monto</IonLabel>
                    <IonInput autocomplete='off' type='number' value={monto} onIonChange={e => setMonto(e.detail.value)}></IonInput>
                </IonItem>
                <IonButton onClick={()=>setShowAlert(true)} className='admin__comprobante-button' fill='outline' color='secondary'>
                    <div className='user__button_text'>
                        <IonIcon src={documentAttachSharp} />
                        <span>SUBIR COMPROBANTE</span>
                    </div>
                </IonButton>
                {comprobante && comprobante.trim() !== '' && 
                    <IonButton className='admin__enviar-button' onClick={() => setComprobante('')} expand='block' fill='clear' style={{ padding: '0 10px' }}>
                        <IonIcon size='large' src={trashBinSharp}/>
                    </IonButton>
                }
                {comprobante && comprobante.trim() !== '' && <IonImg style={{ height: '50vh', padding: '10px' }} src={comprobante}></IonImg>}
            </IonContent>
            <IonFooter>
                <IonToolbar color='secondary'>

                <IonButton className='admin__enviar-button' onClick={create} 
                expand='block' 
                fill='solid' 
                disabled={ !quien || quien === '' || !motivo || !monto}
                style={{ padding: '0 10px' }}>ENVÍAR</IonButton>
                </IonToolbar>
            </IonFooter>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                cssClass='my-custom-class'
                header={'Seleccioná como querés subir el comprobante'}
                message={''}
                buttons={[
                    {
                        text: 'Galería',
                        cssClass: 'secondary',
                        id: 'cancel-button',
                        handler: blah => {
                            uploadPhoto()
                        }
                    },
                    {
                        text: 'Sacár Foto',
                        id: 'confirm-button',
                        handler: () => {
                            takePhoto()
                        }
                    }
                ]}
            />
            <IonToast
                isOpen={showError}
                color='danger'
                onDidDismiss={() => setShowError(false)}
                message={error}
                duration={3000}
            />
        </>
    )
}

export default ModalIngreso