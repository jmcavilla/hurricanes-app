import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonList, IonListHeader, IonTitle, IonToolbar } from '@ionic/react'
import { closeCircleSharp } from 'ionicons/icons'
import React from 'react'

const ModalHorarios = ({ dismiss }) => {
    return (
        <>
            <IonHeader>
                <IonToolbar color='secondary'>
                    <IonTitle>Horarios</IonTitle>
                    <IonButton slot='end' fill='clear' onClick={dismiss}>
                        <IonIcon color='light' icon={closeCircleSharp} style={{fontSize: '1.8em'}}></IonIcon>
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonListHeader lines="full" color='primary'> <strong>Superior / Veteranos</strong></IonListHeader>
                    <IonItem>Martes - 21 a 23hs</IonItem>
                    <IonItem>Jueves - 21 a 23hs</IonItem>
                    <IonItem>Sábado - 12 a 14hs</IonItem>
                    <IonListHeader lines="full" color='primary'><strong>Femenino</strong></IonListHeader>
                    <IonItem>Martes - 19 a 21hs</IonItem>
                    <IonItem>Jueves - 19 a 21hs</IonItem>
                    <IonItem>Sábado - 10 a 12hs</IonItem>
                    <IonListHeader lines="full" color='primary'><strong>Juveniles</strong></IonListHeader>
                    <IonItem>Martes - 19 a 21hs</IonItem>
                    <IonItem>Jueves - 19 a 21hs</IonItem>
                    <IonItem>Sábado - 10 a 12hs</IonItem>
                    <IonListHeader lines="full" color='primary'> <strong>Infantiles</strong></IonListHeader>
                    <IonItem>PRÓXIMAMENTE</IonItem>
                    {/* <IonItem>Jueves - 21 a 23hs</IonItem>
                    <IonItem>Sábado - 12 a 14hs</IonItem> */}
                </IonList>
            </IonContent>
        </>
    )
}

export default ModalHorarios