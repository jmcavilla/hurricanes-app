import { IonButton, IonCard, IonCardSubtitle, IonCardTitle, IonCol, IonImg, IonList, IonRow } from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const Familia = () => {
  const { user } = useSelector((state: RootState) => state.user)
  return (
    <IonList>
      {/* <IonCard color='tertiary'>
        <IonRow>
          <IonCol size='4'>
            <div className='card__photo-rounded' style={{ backgroundImage: `url(.${user?.image})` }}>
            </div>
          </IonCol>
          <IonCol size='5' className='card__data'>
            <IonCardTitle>{user?.name} {user?.lastName}</IonCardTitle>
            <IonCardSubtitle>N° socio: {('00000000' + user?.cardId).slice(-8)}</IonCardSubtitle>
            <IonCardSubtitle>Documento: {user?.dni}</IonCardSubtitle>
            <IonCardSubtitle>Edad: {user?.cardId}</IonCardSubtitle>
            <IonCardSubtitle>Categoria: {user?.category}</IonCardSubtitle>
          </IonCol>
          <IonCol size='3'>
            <div className='card__img'>
              <IonImg src={`${process.env.PUBLIC_URL}/assets/images/hurricanes_logo.png`} />
            </div>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size='12' style={{
            justifyContent: 'end',
            display: 'flex'
          }}>
            <IonButton fill='outline'>CUOTAS</IonButton>
          </IonCol>
        </IonRow>
      </IonCard> */}
    </IonList>
  );
};

export default Familia;
