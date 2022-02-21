import { InAppBrowser } from "@awesome-cordova-plugins/in-app-browser";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonImg, IonItem, IonLabel, IonList, IonListHeader, IonModal, IonPage, IonRow } from "@ionic/react";
import moment from "moment";
import { useState } from "react";
import DateCards from "../../components/date/DateCards";
import HomeCard from "../../components/HomeCard";
import ModalHorarios from "../../components/modals/ModalHorarios";


const TabHome: React.FC = () => {
  const [showHorarios, setShowHorarios] = useState(false)
  const text = 'Conocé los horarios de entrenamiento de todas nuestras categorías';
  const goToHorariosModal = () => {
    setShowHorarios(true);
  } 
  return (
    <IonPage>
      <IonList>
        <HomeCard 
          img={`${process.env.PUBLIC_URL}/assets/images/horarios.jpeg`} 
          text={text} 
          onBtnClick={goToHorariosModal} 
        />
      </IonList>
      <IonModal isOpen={showHorarios}>
        <ModalHorarios dismiss={() => { setShowHorarios(false) }}/>
      </IonModal>
    </IonPage>
  );
};

export default TabHome;
