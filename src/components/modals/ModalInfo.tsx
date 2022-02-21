import { IonButton, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react'
import { closeCircleSharp } from 'ionicons/icons'
import React from 'react'

const ModalInfo = ({ dismiss }) => {
    return (
        <>
            <IonHeader>
                <IonToolbar color='secondary'>
                    <IonTitle>Info</IonTitle>
                    <IonButton slot='end' fill='clear' onClick={dismiss}>
                        <IonIcon color='light' icon={closeCircleSharp} style={{ fontSize: '1.8em' }}></IonIcon>
                    </IonButton>
                </IonToolbar>
            </IonHeader>
        </>
    )
}

export default ModalInfo