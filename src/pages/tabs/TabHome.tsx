import { InAppBrowser } from "@awesome-cordova-plugins/in-app-browser";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonImg, IonItem, IonLabel, IonList, IonListHeader, IonModal, IonPage, IonRow } from "@ionic/react";
import moment from "moment";
import { useState } from "react";
import DateCards from "../../components/date/DateCards";
import HomeCard from "../../components/HomeCard";
import HomeCarousel from "../../components/HomeCarousel";
import ModalHorarios from "../../components/modals/ModalHorarios";
import ModalInfo from "../../components/modals/ModalInfo";


const TabHome: React.FC = () => {
  const [showHorarios, setShowHorarios] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const text = 'Conocé los horarios de entrenamiento de todas nuestras categorías';
  const textInfo = 'Encontrá toda la información sobre las cuotas, categorías, etc.'
  const goToHorariosModal = () => {
    setShowHorarios(true);
  }
  const goToInfoModal = () => {
    setShowInfo(true)
  }
  return (
    <IonPage>
      <IonContent>
        <HomeCarousel />
        <div style={{ flex: 1 }}>

          <IonList >
            <HomeCard
              img={`${process.env.PUBLIC_URL}/assets/images/info.jpeg`}
              text={textInfo}
              onBtnClick={goToInfoModal}
            />
            <HomeCard
              img={`${process.env.PUBLIC_URL}/assets/images/horarios.jpeg`}
              text={text}
              onBtnClick={goToHorariosModal}
              position='right'
            />
          </IonList>
        </div>
      </IonContent>
      <IonModal isOpen={showHorarios}>
        <ModalHorarios dismiss={() => { setShowHorarios(false) }} />
      </IonModal>
      <IonModal isOpen={showInfo}>
        <ModalInfo dismiss={() => { setShowInfo(false) }} />
      </IonModal>
    </IonPage>
  );
};

export default TabHome;
