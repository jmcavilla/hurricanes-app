import { AppVersion } from '@awesome-cordova-plugins/app-version'
import { IonImg, IonPage } from '@ionic/react'
import React, { useEffect, useState } from 'react'

const SplashScreen: React.FC = () => {
    const [version, setVersion] = useState('v1.0.0')

    const getAppVersion = async () => {
        setVersion(`v${await AppVersion.getVersionNumber()}`)
    }

    useEffect(() => {
        getAppVersion();
    }, [])
    return (
        <IonPage
            style={{
                backgroundColor: 'var(--ion-color-secondary)',
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
            <div className='splash__klover animate__animated animate__fadeInUp animate__delay-1s'>
                <div>
                </div>
                <div className='logo_container'>
                    <span className='version-code'> {version} </span>
                    <span>developed by</span>
                    <IonImg src={process.env.PUBLIC_URL + '/assets/icon/klover_logo.png'} />
                </div>
            </div>
        </IonPage>
    )
}

export default SplashScreen
