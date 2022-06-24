import { InAppBrowser } from "@awesome-cordova-plugins/in-app-browser";
import { IonButton, IonContent, IonIcon, IonList, IonModal, IonPage, IonTitle } from "@ionic/react";
import { logoInstagram } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import HomeCard from "../../components/HomeCard";
import HomeCarousel from "../../components/HomeCarousel";
import ModalHorarios from "../../components/modals/ModalHorarios";
import ModalInfo from "../../components/modals/ModalInfo";
import { startGetMembers } from "../../store/staff/staff.actions";


const TabHome: React.FC = () => {
  const dispatch = useDispatch();
  const [showHorarios, setShowHorarios] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const text = 'Conocé al staff que trabaja en nuestro club';
  const textInfo = 'Encontrá toda la información sobre donde son los entrenamientos.'
  const goToHorariosModal = () => {
    setShowHorarios(true);
  }
  const goToInfoModal = () => {
    setShowInfo(true)
  }
  const openInstagram = () => {
    InAppBrowser.create(`https://www.instagram.com/hurricanes_rugbyba/`,'_system');
  }

  useEffect(() => {
    dispatch(startGetMembers());
  }, [])
  

  return (
    <IonPage>
      <IonContent color="secondary">
        <HomeCarousel />
        
        <div style={{ flex: 1 }}>
          <IonList className="ion-no-padding" style={{ borderRadius: '15px'}}>
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
          <IonButton expand="full" size="large" fill="clear" color="light" onClick={ openInstagram }>
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
