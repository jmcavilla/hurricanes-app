import { InAppBrowser } from "@awesome-cordova-plugins/in-app-browser";
import { IonCard, IonCol, IonGrid, IonImg, IonItem, IonList, IonListHeader, IonPage, IonRow } from "@ionic/react";
import DateCards from "../../components/date/DateCards";


const TabHome: React.FC = () => {

  return (
    <IonPage>
      {/* <div className='login__logo-container'> */}
        <IonGrid>
          <DateCards />
          <IonRow>
            <IonCol>
              {/* <IonImg
                className="animate__animated"
                src={`${process.env.PUBLIC_URL}/assets/images/hurricanes_logo.png`}
              /> */}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard color="primary" onClick={() => { InAppBrowser.create('https://pency.app/hurricanesrugbyba','_system')}}>
              <h1 className="home__title">¡Visitá nuestro shop online!</h1>
                <IonImg
                  className="animate__animated"
                  src={`${process.env.PUBLIC_URL}/assets/images/shop_online.jpg`}
                />
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              
            </IonCol>
          </IonRow>
        </IonGrid>
      {/* </div> */}

    </IonPage>
  );
};

export default TabHome;
