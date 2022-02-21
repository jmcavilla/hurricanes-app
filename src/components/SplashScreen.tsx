import { IonImg, IonPage } from '@ionic/react'
import React from 'react'

const SplashScreen: React.FC = () => {
    return (
        <IonPage 
            style={{ 
                backgroundColor: '#fff',
                display: 'flex',
                justifyContent: 'center'
            }}
            >
            <IonImg 
                className="animate__animated animate__fadeInDown" 
                src={`${process.env.PUBLIC_URL}/assets/images/hurricanes_logo.png`}
            />
        </IonPage>
    )
}

export default SplashScreen
