import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonRow, IonTitle, IonToolbar } from '@ionic/react'
import { logOutSharp } from 'ionicons/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Socio from '../pages/tabs/segment/Socio'
import { RootState } from '../store'
import { startLogout } from '../store/auth/auth.actions'
import { unsetSocioData } from '../store/socio/socio.actions'
import { uiCloseLoading, uiOpenLoading } from '../store/ui/ui.actions'
import { unsetUserAction } from '../store/user/user.actions'

const Carnet = () => {
    const { data: socio } = useSelector((state: RootState) => state.socio);
    
    return (
        <>
            
            <IonContent>
                <Socio socio={socio} />
                <IonRow style={{ marginTop: '20px' }}>
                    {/* <IonCol>
                        <div style={{ padding: '0 10vw' }}>
                            <IonButton color='secondary' fill='outline' expand='block'> VER FICHA</IonButton>
                        </div>
                    </IonCol> */}
                    {/* <IonCol>
                        <div style={{ padding: '0 10vw'}}>
                            <IonButton color='secondary' fill='solid' expand='block'> VER CUOTAS</IonButton>
                        </div>
                    </IonCol> */}
                </IonRow>
            </IonContent>
        </>
    )
}

export default Carnet