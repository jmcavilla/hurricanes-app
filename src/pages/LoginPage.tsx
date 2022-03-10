import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonPage, IonRow, } from '@ionic/react'
import { closeCircleSharp } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CardChangePass from '../components/CardChangePass'
import CardLogin from '../components/CardLogin'
import CardOlvide from '../components/CardOlvide'
import CardToken from '../components/CardToken'
import { startChecking } from '../store/auth/auth.actions'
import { uiHideLogin } from '../store/ui/ui.actions'

const LoginPage = () => {
    const [email, setEmail] = useState('');    
    const [showOlvide, setShowOlvide] = useState(false);
    const [showTokenOlvide, setShowTokenOlvide] = useState(false);
    const [showChange, setShowChange] = useState(false);
    const [showChangeSuccess, setShowChangeSuccess] = useState(false);
    const dispatch = useDispatch();

    const goToLogin = () => {
        setShowChangeSuccess(true);
        setShowTokenOlvide(false);
        setShowOlvide(false);
        setShowChange(false);
    }

    const showOlvideAction = () => {
        setShowTokenOlvide(false);
        setShowOlvide(true);
        setShowChange(false);
    }

    const showTokenOlvideAction = () => {
        setShowTokenOlvide(true);
        setShowOlvide(false);
        setShowChange(false);
    }

    const showChangeAction = () => {
        setShowTokenOlvide(false);
        setShowOlvide(false);
        setShowChange(true);
    }

    useEffect(() => {
        dispatch(startChecking())
    }, [dispatch])

    const close = () => {
        dispatch(uiHideLogin());
    }
    return (
        <IonPage>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size='12' style={{
                            justifyContent: 'end',
                            display: 'flex'
                        }}>
                            <IonButton fill='clear' onClick={close}>
                                <IonIcon style={{ fontSize: '25px' }} color='primary' icon={closeCircleSharp}></IonIcon>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <div className='img-container'>

                                <IonImg
                                    className="img"
                                    src={`${process.env.PUBLIC_URL}/assets/images/hurricanes_logo.png`}
                                />
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        {
                            !showOlvide && !showTokenOlvide && !showChange &&
                            <CardLogin 
                                email={ email } 
                                setEmail={ setEmail } 
                                showOlvideAction={ showOlvideAction }
                                showChangeSuccess={showChangeSuccess}
                                setShowChangeSuccess={setShowChangeSuccess}
                            />
                        }
                        {
                            showOlvide && 
                            <CardOlvide
                                email={email}
                                setEmail={setEmail}
                                showTokenOlvideAction={showTokenOlvideAction}
                            />
                        }
                        {
                            showTokenOlvide &&
                            <CardToken 
                                email={email} 
                                showChangeAction={showChangeAction} 
                            />
                        }
                        {
                            showChange && 
                            <CardChangePass email={email} goToLogin={goToLogin} />
                        }
                        {/* !showTokenOlvide 
                            ? 
                                <CardOlvide
                                    email={email}
                                    setEmail={setEmail}
                                    setShowTokenOlvide={setShowTokenOlvide}
                                />
                            :
                            !showChange 
                            ?
                                <CardToken 
                                    email={email} 
                                    setShowChange={setShowChange} 
                                />
                            :
                            <CardChangePass email={email} goToLogin={goToLogin} />
                        } */}
                    </IonRow>
                </IonGrid>
            </IonContent>
            
        </IonPage>
    )
}

export default LoginPage
