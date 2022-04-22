import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonModal, IonRow } from '@ionic/react'
import { checkmarkCircleSharp } from 'ionicons/icons'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SocioSlides from '../pages/slides/SocioSlides';
import { RootState } from '../store';
import { uiHideAddFamily, uiHideFieldsSocio, uiShowAddFamily, uiShowFieldsSocio } from '../store/ui/ui.actions';

const SocioData = () => {
    const { showFieldsSocio, showAddFamily } = useSelector((state: RootState) => state.ui);
    const dispatch = useDispatch();
    
    return (
        <IonContent>
            <IonGrid>
                <IonRow>
                    <IonCol size='12'>
                        <div className='user__success-icon'>
                            <IonIcon color='success' style={{ fontSize: '20vh' }} src={checkmarkCircleSharp} />
                        </div>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size='12' className='ion-text-center'>
                        <h3>¡Ya estás registrado!</h3>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size='12' className='ion-text-center'>
                        <h4>Ahora por favor, para terminar de asociarte completá tus datos.</h4>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size='12' className='ion-text-center'>
                        {/* <IonLabel>¿Querés asociar a tu hijo/a? </IonLabel> */}
                        <IonButton className='user__button_large' onClick={() => { dispatch(uiShowFieldsSocio()) }} fill='outline' color='secondary'>
                            <span>COMPLETÁ TUS DATOS ACÁ</span>
                        </IonButton>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size='12' className='ion-text-center'>
                        {/* <IonLabel>¿Querés asociar a tu hijo/a? </IonLabel> */}
                        <IonButton className='user__button_large' onClick={() => { dispatch(uiShowAddFamily()) }} fill='outline' color='secondary'>
                            <span>ASOCIÁ UN FAMILIAR</span>
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
            <IonModal isOpen={showFieldsSocio}>
                <SocioSlides close={() => {
                    dispatch(uiHideFieldsSocio());
                }}></SocioSlides>
            </IonModal>
            <IonModal isOpen={showAddFamily}>
                <SocioSlides parent={true} close={() => {
                    dispatch(uiHideAddFamily());
                }}></SocioSlides>
            </IonModal>
        </IonContent>
    )
}

export default SocioData