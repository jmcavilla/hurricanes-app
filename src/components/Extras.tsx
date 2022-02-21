import { AppVersion } from '@awesome-cordova-plugins/app-version';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser';
import { LaunchReview } from '@awesome-cordova-plugins/launch-review';
import { IonImg, IonItem, IonLabel, IonList, IonListHeader } from '@ionic/react';
import React, { useEffect, useState } from 'react';

const Extras = () => {
    const [version, setVersion] = useState('N/A')
    const [code, setCode] = useState('N/A');
    const goToRate = () => {
        LaunchReview.launch()
    }

    const goToDonate = () => {
        InAppBrowser.create("https://cafecito.app/tionano55")
    }

    const getAppVersion = async () => {
        setVersion(`v${await AppVersion.getVersionNumber()}`)
        setCode(String(await AppVersion.getVersionCode()))
    }

    useEffect(() => {
        getAppVersion();
    }, [])

    return (
        <>
            <IonList style={{ padding: '0' }}>
                <IonListHeader lines="full" color="primary">
                    <IonLabel>
                        Extras
                    </IonLabel>
                </IonListHeader>
                <IonItem button color="secondary" lines="none" onClick={goToRate}>
                    <IonLabel>Ayuda y comentarios</IonLabel>
                </IonItem>
                <IonItem button color="secondary" lines="none" onClick={goToRate}>
                    <IonLabel>Valorar la app</IonLabel>
                </IonItem> {/* */}
                <IonItem button color="secondary" lines="none" onClick={goToDonate}>
                    <IonLabel>¡Ayudanos!</IonLabel>
                </IonItem>
            </IonList>
            <IonItem color="primary" lines="none">
                <div className="user__versionContainer">
                    <div className="versionCode">
                        <IonLabel> {version} </IonLabel>
                    </div>
                </div>
            </IonItem>
            <IonItem color="primary" lines="none">
                <div className="user__versionContainer">
                    <div className="developed">
                        developed by
                    </div>
                    <div>
                        <IonImg src={process.env.PUBLIC_URL + '/assets/icon/klover_logo.png'} />
                    </div>
                </div>
            </IonItem>
        </>
    );
};

export default Extras;
