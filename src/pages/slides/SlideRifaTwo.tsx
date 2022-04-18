import { IonButton, IonCard, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFooter, IonIcon, IonImg, IonInput, IonItem, IonItemDivider, IonLabel, IonProgressBar, IonRow, IonSelect, IonSelectOption, IonToolbar, useIonLoading } from '@ionic/react';
import { arrowBack, arrowForward } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSinToken } from '../../helpers/fetch';
import { RootState } from '../../store';
import { rifaGetAvailable } from '../../store/evento/evento.actions';

const SlideRifaTwo = ({ onBtnClicked, rifa }) => {
    const dispatch = useDispatch()
    const { availableNumbers } = useSelector((state: RootState) => state.evento)
    const [selectedNumbers, setSelectedNumbers] = useState([])
    const [choose, setChoose] = useState('')
    const [randomQuantity, setrandomQuantity] = useState(0)

    const next = () => {
        onBtnClicked("next", {
            numeros: selectedNumbers
        });
    }

    const selectNumber = (index) => {
        let numbers = selectedNumbers;
        numbers.push(availableNumbers[index])
        console.log(availableNumbers[index])
        console.log(numbers)
        setSelectedNumbers(numbers)
        dispatch(rifaGetAvailable(availableNumbers.filter((el,i) =>  i != index)))
        // setAvailableNumbers();
    }
    
    const removeNumber = (index) => {
        let numbers = availableNumbers;
        numbers.push(selectedNumbers[index]);
        numbers.sort(function(a, b) {
            return parseFloat(a.numero) - parseFloat(b.numero);
        });
        dispatch(rifaGetAvailable(numbers))
        setSelectedNumbers(selectedNumbers.filter((el,i) =>  i != index));
    }

    const randomize = (quantity) => {
        // present();
        try {
            setrandomQuantity(quantity)
            let numbers = [];
            for (let index = 0; index < quantity; index++) {
                // const element = quantity;
                let eleInd = Math.floor(Math.random() * availableNumbers.length)
                debugger;
                const randomElement = availableNumbers[eleInd];
                if(!randomElement.selected){
                    numbers.push(randomElement);
                    // setAvailableNumbers(availableNumbers.filter((el,i) =>  i != eleInd));
                    dispatch(rifaGetAvailable(availableNumbers.filter((el,i) =>  i != eleInd)))
                }else{
                    index--;
                }
            }
            setSelectedNumbers(numbers);
        // dismiss();
        } catch (error) {
            // dismiss();
        }
    }

    useEffect(() => {
        setSelectedNumbers([])
    }, [choose])
    

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', width: '100%' }}>
            <IonContent>
                {
                
                    <>
                        <IonCard className='ion-padding' style={{
                            border: '2px solid var(--ion-color-secondary)'
                        }} >
                            <IonCardTitle color="secondary" style={{ fontSize: '1.5em' }}>
                                <strong>Precio: ${rifa?.value}</strong> 
                            </IonCardTitle>
                        </IonCard>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: '15px'
                        }}>
                            <IonCardTitle color="primary" style={{ fontSize: '1.5em' }}>
                                Elegí tus números
                            </IonCardTitle>
                            <IonLabel>
                                <p>Presioná sobre el número que quieras elegir</p>
                            </IonLabel>
                        </div>
                        {/* <IonCardSubtitle>Números elegidos</IonCardSubtitle> */}
                        <IonItemDivider>Números elegidos</IonItemDivider>
                        <IonRow>
                            {
                                selectedNumbers && selectedNumbers.length > 0 ?
                                <>
                                {selectedNumbers.map((number, i) => (
                                    <IonCol size='4' key={i}>
                                        <IonCard 
                                            style={{
                                                padding: '5px',
                                                fontSize: '6vw',
                                                border: '3px solid var(--ion-color-tertiary)'
                                            }} 
                                            // color={'warning'}
                                            onClick={() => { 
                                                removeNumber(i);
                                            }}
                                            >
                                            <strong>D{ number.numero }</strong>
                                        </IonCard>
                                    </IonCol>
                                ))}
                                </>
                                :
                                <>
                                    <IonLabel className='ion-padding'>
                                        <p>No se eligieron números aún</p>
                                    </IonLabel>
                                </>
                                
                            }
                        </IonRow>
                        {/* <IonCardSubtitle>Números libres</IonCardSubtitle> */}
                        <IonItemDivider>Números libres</IonItemDivider>
                        <IonRow>
                        {
                            availableNumbers && availableNumbers.length > 0 &&
                            availableNumbers.map((number, i) => (
                                !number.selected && <IonCol size='4' key={i}>
                                    <IonCard 
                                        style={{
                                            padding: '2vw',
                                            fontSize: '6vw',
                                            border: '3px solid var(--ion-color-success)',
                                            color: 'var(--ion-color-primary)'
                                        }}
                                        // color={number.selected ? 'danger' : 'success'}
                                        onClick={() => { 
                                            if(!number.selected){
                                                selectNumber(i);
                                            }
                                        }}
                                    >
                                        <strong>D{ number.numero }</strong>
                                    </IonCard>
                                </IonCol>
                            ))
                            
                        }
                        </IonRow>
                    </>
                
                }   
            </IonContent>
            <IonFooter mode='ios'>
                <IonToolbar color="secondary" mode='ios'>
                    <IonRow>
                        <IonCol>
                            <IonButton
                                mode='ios'
                                expand="full"
                                fill="clear"
                                color='light'
                                // disabled={mySlides.current?.isEnd}
                                onClick={() => { onBtnClicked("prev") }}
                            >
                                <IonIcon icon={arrowBack} />ATRÁS
                            </IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton
                                mode='ios'
                                expand="full"
                                fill="clear"
                                color='light'
                                disabled={!(selectedNumbers && selectedNumbers.length > 0)}
                                onClick={next}
                            >
                                SIGUIENTE <IonIcon icon={arrowForward} />
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonToolbar>
            </IonFooter>

        </div>
    );
};

export default SlideRifaTwo;
