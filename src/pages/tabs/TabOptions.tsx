import { IonIcon, IonItem, IonLoading, IonPage } from '@ionic/react';
import { logOutSharp } from 'ionicons/icons';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Extras from '../../components/Extras';
import { unsetUserAction } from '../../store/user/user.actions';

const TabOptions = () => {
    const [showLoading, setShowLoading] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const logOut = () => {
        setShowLoading(true);
        setTimeout(() => {
            dispatch(unsetUserAction());
            history.replace('/login')
        }, 5000);
    }

    return (
        <IonPage>
            <IonItem button color='secondary' onClick={logOut}>
                Salir
                <IonIcon slot='end' src={logOutSharp} />
            </IonItem>
            <Extras />
            <IonLoading
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                duration={5000}
            />
        </IonPage>
    );
};

export default TabOptions;
