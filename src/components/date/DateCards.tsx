import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonRow } from '@ionic/react';
import moment from 'moment';

const DateCards = () => {

    let today = moment();
    let tomorrow = moment().add(1, 'days');
    let yesterday = moment().add(-1, 'days');
    return (
        <>
            <IonGrid>
                <IonRow>
                    <IonCol size="4">
                        <IonCard color='primary'>
                            <IonCardHeader className="ion-text-center">
                                <IonCardSubtitle>{yesterday.format('MMM')}</IonCardSubtitle>
                                <IonCardTitle>{yesterday.date()}</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                    </IonCol>
                    <IonCol size="4">
                        <IonCard color='secondary'>
                            <IonCardHeader className="ion-text-center">
                                <IonCardSubtitle>{today.format('MMM')}</IonCardSubtitle>
                                <IonCardTitle>{today.date()}</IonCardTitle>
                                <IonCardSubtitle>Hoy</IonCardSubtitle>
                            </IonCardHeader>
                        </IonCard>
                    </IonCol>
                    <IonCol size="4">
                        <IonCard color='primary'>
                            <IonCardHeader className="ion-text-center">
                                <IonCardSubtitle>{tomorrow.format('MMM')}</IonCardSubtitle>
                                <IonCardTitle>{tomorrow.date()}</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </>
    )
}

export default DateCards
