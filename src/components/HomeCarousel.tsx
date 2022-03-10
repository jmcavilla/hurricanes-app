import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const HomeCarousel = () => {
    return (
        <Carousel 
        showThumbs={false} 
        autoPlay={true} 
        showStatus={false} 
        showArrows={false} 
        infiniteLoop={true}
        dynamicHeight={false}
        interval={15000}>
            <div>
                <img alt='aprende' src={`${process.env.PUBLIC_URL}/assets/images/aprende.jpg`}  />
                {/* <p className="legend">Legend 1</p> */}
            </div>
            <div>
                <img alt='veni_infantiles' src={`${process.env.PUBLIC_URL}/assets/images/veni_infantiles.jpg`}  />
                {/* <p className="legend">Legend 2</p> */}
            </div>
            <div>
                <img alt='donde_entrenamos' src={`${process.env.PUBLIC_URL}/assets/images/donde_entrenamos.jpg`}  />
                {/* <p className="legend">Legend 3</p> */}
            </div>
        </Carousel>
    )
}

export default HomeCarousel