import { IonButton, IonCol, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption, useIonLoading } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { fetchConToken } from '../helpers/fetch';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { trashBinSharp, imageOutline } from 'ionicons/icons';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { startGetEgresos, startGetIngresos } from '../store/admin/admin.actions';

const InfoCuotaPaga = ({ cuota, close, socio, pagar = false }) => {
    const dispatch = useDispatch()

    const { user } = useSelector((state: RootState) => state.user);
    const [formaPago, setFormaPago] = useState('');
    const [quienRecibio, setQuienRecibio] = useState('');
    const [comprobante, setComprobante] = useState('');
    const [present, dismiss] = useIonLoading()
    const marcarPagado = async (cuota_id) => {
        present();
        const resp = await fetchConToken('cuota/marcarPagado', { cuota_id, forma_pago: formaPago, quien_recibio: quienRecibio, comprobante }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            if(socio.tipo_socio !== 'P'){
                createIngreso();
            }
            close();
        }
        dismiss()
    }

    const uploadPhoto = async () => {
        const image = await Camera.getPhoto({
            quality: 40,
            allowEditing: false,
            resultType: CameraResultType.Base64,
            source: CameraSource.Photos
        })

        if (image) {
            console.log('base64', image.base64String);
            setComprobante('data:image/jpeg;base64,' + image.base64String);
        }
    }

    const createIngreso = async () => {
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
            concepto: `CUOTA SOCIO Nº: ${('0000' + socio?.numero_socio).slice(-4)}`,
            monto: cuota.monto,
            tipo: 'Ingreso',
            user_id: user.uid,
            quien: cuota.quien_recibio,
            fecha: moment().format('DD/MM/YYYY'),
            motivo: 'CUOTA',
            mes: moment().month() + 1,
            anio: moment().year()
        }

        const resp = await fetchConToken('contable/new', {...data}, 'POST')
        const body = await resp.json();

        if(body.ok){
            dispatch(startGetIngresos());
            dispatch(startGetEgresos());
            dismiss();
        }else{
            dismiss();
        }
    }

    useEffect(() => {
        setFormaPago(cuota.forma_pago);
        setQuienRecibio(cuota.quien_recibio);
        setComprobante(cuota.comprobante);
    }, [cuota])
    
    return (
        <div className='ion-padding'>
            <IonRow>

            <IonCol size='12' className='ion-text-center'>
                {comprobante && comprobante.trim() !== '' && <IonImg style={{ height: '50vh', padding: '10px' }} src={comprobante}></IonImg>}
                {comprobante && comprobante.trim() !== '' && pagar &&
                    <IonButton className='admin__enviar-button' onClick={() => setComprobante('')} expand='block' fill='clear' style={{ padding: '0 10px' }}>
                        <IonIcon size='large' src={trashBinSharp}/>
                    </IonButton>
                }
                {!comprobante && <IonIcon size='large' src={imageOutline}/>}
            </IonCol>
            <IonCol size='12'>
                <IonItem>
                    <IonLabel position='stacked'>Forma de pago</IonLabel>
                    <IonSelect
                        disabled={!pagar}
                        value={formaPago}
                        okText="Aceptar"
                        cancelText="Cancelar"
                        onIonChange={e => {
                            setFormaPago(e.detail.value)
                        }}
                    >
                        <IonSelectOption value='Efectivo'>Efectivo</IonSelectOption>
                        <IonSelectOption value='Transeferencia'>Transeferencia</IonSelectOption>
                        <IonSelectOption value='Mercado Pago'>Mercado Pago</IonSelectOption>
                        <IonSelectOption value='Excento'>Excento</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel position='stacked'>¿Quién recibió el dinero?</IonLabel>
                    <IonInput disabled={!pagar} value={quienRecibio} onIonChange={e => setQuienRecibio(e.detail.value)}></IonInput>
                </IonItem>
            </IonCol>
            </IonRow>
            {formaPago && formaPago !== '' && formaPago !== 'Efectivo' && pagar && <IonButton color='secondary' fill='solid' expand='block' onClick={uploadPhoto}>SUBIR COMPROBANTE</IonButton>}
            
            {pagar && <IonButton
                color='secondary'
                fill='outline'
                expand='block'
                onClick={() => { marcarPagado(cuota._id) }}
                disabled={!formaPago || !quienRecibio || (formaPago !== 'Efectivo' && !comprobante)}
            >GUARDAR</IonButton>}
        </div>
    )
}

export default InfoCuotaPaga