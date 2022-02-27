import { IonButton, IonContent, IonIcon, IonList, IonModal, IonPage, IonTitle } from "@ionic/react";
import { logoInstagram } from "ionicons/icons";
import { useState } from "react";
import HomeCard from "../../components/HomeCard";
import HomeCarousel from "../../components/HomeCarousel";
import ModalHorarios from "../../components/modals/ModalHorarios";
import ModalInfo from "../../components/modals/ModalInfo";


const TabHome: React.FC = () => {
  const [showHorarios, setShowHorarios] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const text = 'Conocé los horarios de entrenamiento de todas nuestras categorías.';
  const textInfo = 'Encontrá toda la información sobre donde son los entrenamientos.'
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
          <IonList className="ion-no-padding">
            <HomeCard
              img={`${process.env.PUBLIC_URL}/assets/images/lugar_entrenamiento.jpeg`}
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
        <div>
          <IonTitle className="ion-text-center" style={{
                marginTop: '14px',
                fontWeight: 'bold'
          }}>Seguinos en Instagram</IonTitle>
          <IonButton expand="full" size="large" fill="clear" color="secondary">
            <IonIcon style={{ fontSize: '5vh'}} src={logoInstagram}></IonIcon>
          </IonButton>
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
