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
            <div className='splash__logo'>

                <IonImg
                    className="animate__animated animate__fadeInDown"
                    src={`${process.env.PUBLIC_URL}/assets/images/hurricanes_logo.png`}
                />
            </div>
            <div className='splash__klover animate__animated animate__fadeInUp'>
                <div className='logo_container'>
                    <span>developed by</span>
                    <IonImg src={process.env.PUBLIC_URL + '/assets/icon/klover_logo.png'} />
                </div>
            </div>
        </IonPage>
    )
}

export default SplashScreen
