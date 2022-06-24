import { IonButton, IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonList, IonListHeader, IonTitle, IonToolbar } from '@ionic/react'
import { closeCircleSharp } from 'ionicons/icons'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const ModalHorarios = ({ dismiss }) => {
    const { members } = useSelector((state: RootState) => state.staff);

    return (
        <>
            <IonHeader>
                <IonToolbar color='secondary'>
                    <IonTitle>Nuestro Staff</IonTitle>
                    <IonButton slot='end' fill='clear' onClick={dismiss}>
                        <IonIcon color='light' icon={closeCircleSharp} style={{fontSize: '1.8em'}}></IonIcon>
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {
                        members.map( member => (
                            <IonCard>
                                <IonImg src={member.photo}></IonImg>
                                <IonCardHeader>
                                    {member.descripcion}
                                </IonCardHeader>
                                <IonCardContent>
                                    {member.nombre}
                                </IonCardContent>
                            </IonCard>
                        ))
                    }
                    
                </IonList>
            </IonContent>
        </>
    )
}

export default ModalHorarios