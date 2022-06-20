import React, { useEffect } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { startGetAllEventos } from '../store/evento/evento.actions';
import { RootState } from '../store';

const HomeCarousel = () => {
    const { eventos } = useSelector((state: RootState) => state.evento);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startGetAllEventos());
    }, [])
    

    return (
        <>
            {
                !!eventos && eventos.length > 0 ? <Carousel 
                    showThumbs={false} 
                    autoPlay={true} 
                    showStatus={false} 
                    showArrows={false} 
                    infiniteLoop={true}
                    dynamicHeight={false}
                    interval={15000}>
                        {
                            eventos.map((evento, i) => (
                                <div>
                                    <img alt='aprende' src={`${evento.imagen}`}  />
                                    {/* <p className="legend">Legend 1</p> */}
                                </div>
                            ))
                        }
                </Carousel>
                :
                <Carousel 
                    showThumbs={false} 
                    autoPlay={true} 
                    showStatus={false} 
                    showArrows={false} 
                    infiniteLoop={true}
                    dynamicHeight={false}
                    interval={15000}>
                    <div className='home__carrousel-item' style={{ 
                        backgroundImage: `url("${process.env.PUBLIC_URL}/assets/images/aprende.jpg")` }}>
                        {/* <img alt='aprende' src={`${process.env.PUBLIC_URL}/assets/images/aprende.jpg`}  /> */}
                        {/* <p className="legend">Legend 1</p> */}
                    </div>
                    <div className='home__carrousel-item' style={{ 
                        backgroundImage: `url("${process.env.PUBLIC_URL}/assets/images/veni_infantiles.jpg")` }}>
                        {/* <img alt='veni_infantiles' src={`${process.env.PUBLIC_URL}/assets/images/veni_infantiles.jpg`}  /> */}
                        {/* <p className="legend">Legend 2</p> */}
                    </div>
                    <div className='home__carrousel-item' style={{ 
                        backgroundImage: `url("${process.env.PUBLIC_URL}/assets/images/donde_entrenamos.jpg")` }}>
                        {/* <img alt='donde_entrenamos' src={`${process.env.PUBLIC_URL}/assets/images/donde_entrenamos.jpg`}  /> */}
                        {/* <p className="legend">Legend 3</p> */}
                    </div>
                </Carousel>
            }
        </>
    )
}

export default HomeCarousel