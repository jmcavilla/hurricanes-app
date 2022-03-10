import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser'
import { IonButton, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonListHeader, IonTitle, IonToolbar } from '@ionic/react'
import { arrowForwardSharp, closeCircleSharp } from 'ionicons/icons'
import Map from '../Map'

const ModalInfo = ({ dismiss }) => {

    const openMaps = () => {
        InAppBrowser.create('https://www.google.com/maps/place/LA+QUEMITA/@-34.6504867,-58.4619011,15z/data=!4m2!3m1!1s0x0:0xfc97b5cc30fc08fe?sa=X&ved=2ahUKEwiflaH-z5H2AhVJzjgGHXUrA-sQ_BJ6BAg3EAU','_system')
    }

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
            <IonContent>
                <IonList>
                    <IonListHeader color='primary'>¿Donde entrenamos?</IonListHeader>
                    <IonImg src={`${process.env.PUBLIC_URL}/assets/images/donde_entrenamos.jpg`} />
                    <Map />
                    <IonItem button color='secondary' lines='none' onClick={openMaps}>
                        <IonLabel>Indicaciones</IonLabel>
                        <IonIcon slot='end' icon={arrowForwardSharp}></IonIcon>
                    </IonItem>
                </IonList>
            </IonContent>
        </>
    )
}

export default ModalInfo