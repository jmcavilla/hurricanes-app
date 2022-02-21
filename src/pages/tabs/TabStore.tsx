import { IonPage, useIonLoading } from '@ionic/react'
import React, { useEffect } from 'react'

const TabStore = () => {
    const [present, dismiss] = useIonLoading();

    useEffect(() => {
        present();
        setTimeout(() => {
            dismiss()
        }, 1500);
    }, [])
    
  return (
    <IonPage>
        <iframe src="https://pency.app/hurricanesrugbyba" height={'100%'}></iframe>
    </IonPage>
  )
}

export default TabStore