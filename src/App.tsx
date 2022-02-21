import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonModal, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonToast, setupIonicReact, useIonLoading } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

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
import { useHistory } from 'react-router-dom';
import { RootState } from './store';
import LoginPage from './pages/LoginPage';
import SignInPage from './pages/SignInPage';
import TabUser from './pages/tabs/TabUser';
import { cardSharp, cartSharp, home, optionsSharp, personCircle, personCircleSharp } from 'ionicons/icons';
import TabHome from './pages/tabs/TabHome';
import TabOptions from './pages/tabs/TabOptions';
// import { setupConfig } from '@ionic/react';
import { App as AppPlugin } from "@capacitor/app";
import { startChecking } from './store/auth/auth.actions';
import { uiShowLogin } from './store/ui/ui.actions';
import ParentSignIn from './pages/ParentSignIn';
import TabStore from './pages/tabs/TabStore';
setupIonicReact();

const App: React.FC = () => {
  const { showLogin, showSignIn, showSignInParent } = useSelector((state: RootState) => state.ui)
  const { loading } = useSelector((state: RootState) => state.ui);
  const [present, dismiss] = useIonLoading();
  const [showSplash, setShowSplash] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [backNumber, setBackNumber] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      dispatch(startChecking());
    }
    setTimeout(() => {
      setShowSplash(false);
    }, 5000);
  }, []);

  useEffect(() => {
    if(loading){
        present();
    }else{
        dismiss();
    }
}, [loading])

  document.addEventListener('ionBackButton', (ev: any) => {
    setShowToast(true);
    setBackNumber(backNumber+1);
    console.log(backNumber)
    
    if(backNumber > 1){
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
                      <Redirect path='' to='tabHome' exact/>
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
                      {/* <IonTabButton tab="tabOptions" href='/tabOptions'>
                        <IonIcon icon={optionsSharp} />
                        <IonLabel>Opciones</IonLabel>
                      </IonTabButton> */}
                    </IonTabBar>
                  </IonTabs>
                </IonReactRouter>
                  
            // :
            //     <IonReactRouter>
            //       <IonRouterOutlet>
            //         <Route exact path="/login">
            //           <LoginPage />
            //         </Route>
            //         <Route exact path="/signIn">
            //           <SignInPage />
            //         </Route>
            //         <Route exact path="/">
            //           <Redirect to="/login" />
            //         </Route>
            //       </IonRouterOutlet>
            //     </IonReactRouter>
          }
          <IonModal isOpen={showLogin}>
            <LoginPage />
          </IonModal>
          <IonModal isOpen={showSignIn}>
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
          </>
          
      }
    </IonApp>
  )
};

export default App;
