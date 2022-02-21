import { IonButton, IonCard, IonCardContent, IonImg } from '@ionic/react'
import React from 'react'

type Props = {
    img: string,
    text: string,
    onBtnClick: React.MouseEventHandler,
    position?: 'left' | 'right'
}

const HomeCard:React.FC<Props> = ({ img, text, onBtnClick, position = 'left' }) => {
    return (
        <IonCard>
            <div className="home__card">
                {
                    position === 'left' && 
                    <div className="home__card_img">
                        <IonImg src={ img }></IonImg>
                    </div>
                }
                <div className="home__card_text">
                    <IonCardContent>
                        <h2>{ text }</h2>
                    </IonCardContent>
                    <IonButton onClick={ onBtnClick } color="secondary" fill="outline" expand="block">VER</IonButton>
                </div>
                {
                    position === 'right' && 
                    <div className="home__card_img">
                        <IonImg src={ img }></IonImg>
                    </div>
                }
            </div>
        </IonCard>
    )
}

export default HomeCard