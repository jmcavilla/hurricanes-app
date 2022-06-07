import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonModal, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonToast, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { PushNotifications } from '@capacitor/push-notifications';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './app.scss';
import SplashScreen from './components/SplashScreen';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import LoginPage from './pages/LoginPage';
import SignInPage from './pages/SignInPage';
import TabUser from './pages/tabs/TabUser';
import { cartSharp, home, keyOutline, personCircleSharp, ticketSharp } from 'ionicons/icons';
import TabHome from './pages/tabs/TabHome';
import TabOptions from './pages/tabs/TabOptions';
// import { setupConfig } from '@ionic/react';
import { App as AppPlugin } from "@capacitor/app";
import { startChecking } from './store/auth/auth.actions';
import ParentSignIn from './pages/ParentSignIn';
import TabStore from './pages/tabs/TabStore';
import TabAdmin from './pages/tabs/TabAdmin';
import { uiHideLogin, uiHideSignIn } from './store/ui/ui.actions'
import TabRifa from './pages/tabs/TabRifa';
import { fetchSinToken } from './helpers/fetch';
import { Capacitor } from '@capacitor/core';
setupIonicReact();

const App: React.FC = () => {
  const { showLogin, showSignIn, showSignInParent, error } = useSelector((state: RootState) => state.ui)
  const { user } = useSelector((state: RootState) => state.user);
  const [showError, setShowError] = useState(false);
  const [showSplash, setShowSplash] = useState(Capacitor.isNativePlatform());
  const [showToast, setShowToast] = useState(false);
  const [backNumber, setBackNumber] = useState(1);
  const dispatch = useDispatch();
  const [rifa, setRifa] = useState<any>();

  const getRifas = async () => {
    try {
      const resp = await fetchSinToken(`rifa/`);
      const data = await resp.json();

      console.log(data)
      if (data.ok) {
        setRifa(data.rifa);
      }
    } catch (error) {

    }
  }

  const addListeners = async () => {
    await PushNotifications.addListener('registration', token => {
      console.info('Registration token: ', token.value);
    });
  
    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });
  
    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
    });
  
    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
    });
  }
  
  const registerNotifications = async () => {
    let permStatus = await PushNotifications.checkPermissions();
  
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }
  
    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }
  
    await PushNotifications.register();
  }
  
  const getDeliveredNotifications = async () => {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
  }
  useEffect(() => {
    registerNotifications()
    addListeners();
    getDeliveredNotifications();
    getRifas();
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(startChecking());
    }
    setTimeout(() => {
      setShowSplash(false);
    }, 6000);
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error])

  document.addEventListener('ionBackButton', (ev: any) => {
    setShowToast(true);
    setBackNumber(backNumber + 1);

    if (backNumber > 1) {
      AppPlugin.exitApp()
    }
    setTimeout(() => {
      setBackNumber(1);
    }, 4000);
  });
  return (
    <IonApp>
      {
        showSplash
          ?
          <SplashScreen />
          :
          <>
            {
              // uid ?
              <IonReactRouter>
                <IonTabs >
                  <IonRouterOutlet>
                    <Route path='/tabUser' exact>
                      <TabUser />
                    </Route>
                    <Route path='/tabHome' exact>
                      <TabHome />
                    </Route>
                    <Route path='/tabOptions' exact>
                      <TabOptions />
                    </Route>
                    <Route path='/tabShop' exact>
                      <TabStore />
                    </Route>
                    <Route path='/tabAdmin' exact>
                      <TabAdmin />
                    </Route>
                    <Route path='/tabRifa' exact>
                      <TabRifa />
                    </Route>
                    <Redirect path='' to='tabHome' exact />
                  </IonRouterOutlet>
                  <IonTabBar slot="bottom" color="secondary" >
                    <IonTabButton tab="tabUser" href='/tabUser'>
                      <IonIcon icon={personCircleSharp} />
                      <IonLabel>Socio</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tabHome" href='/tabHome'>
                      <IonIcon icon={home} />
                      <IonLabel>Inicio</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tabShop" href='/tabShop'>
                      <IonIcon icon={cartSharp} />
                      <IonLabel>Shop</IonLabel>
                    </IonTabButton>
                    {rifa && <IonTabButton tab="tabRifa" href='/tabRifa'>
                      <IonIcon icon={ticketSharp} />
                      <IonLabel>Rifas</IonLabel>
                    </IonTabButton>}
                    {user?.admin && <IonTabButton tab="tabAdmin" href='/tabAdmin'>
                      <IonIcon icon={keyOutline} />
                      <IonLabel>Admin</IonLabel>
                    </IonTabButton>}
                    {/* <IonTabButton tab="tabOptions" href='/tabOptions'>
                        <IonIcon icon={optionsSharp} />
                        <IonLabel>Opciones</IonLabel>
                      </IonTabButton> */}
                  </IonTabBar>
                </IonTabs>
              </IonReactRouter>

            }
            <IonModal isOpen={showLogin} onIonModalDidDismiss={() => dispatch(uiHideLogin())}>
              <LoginPage />
            </IonModal>
            <IonModal isOpen={showSignIn} onIonModalDidDismiss={() => dispatch(uiHideSignIn())}>
              <SignInPage />
            </IonModal>
            <IonModal isOpen={showSignInParent}>
              <ParentSignIn />
            </IonModal>
            <IonToast
              isOpen={showToast}
              onDidDismiss={() => setShowToast(false)}
              message="Presiona una vez mas para salir de la app."
              duration={4000}
            />
            <IonToast
              isOpen={showError}
              color='danger'
              onDidDismiss={() => setShowError(false)}
              message={error?.message}
              duration={5000}
              position="top"
            />
          </>

      }
    </IonApp>
  )
};

export default App;
