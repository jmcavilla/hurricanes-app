import React, { useEffect, useRef, useState } from 'react'
import tt from '@tomtom-international/web-sdk-maps';

const Map = (props) => {
    // const position = [-34.65030133584823, -58.46183672866482]
    
    const mapElement = useRef();
    const [mapZoom] = useState(15);
    const [, setMap] = useState({});
    // const map = useRef(tt.map({
    //     key: "FpMziMharZ1u4UWslCyMJeLbpaAX6uof", //TomTom, not Google Maps
    //     container: "map",
    //     center:  [-34.65030133584823, -58.46183672866482],
    //     zoom: 12,
    //   }))


    useEffect(() => {
        let map = tt.map({
            key: "FpMziMharZ1u4UWslCyMJeLbpaAX6uof",
            container: mapElement.current,
            center: [-58.46183672866482,-34.65030133584823],
            zoom: mapZoom,
            interactive: false,
        });

        new tt.Marker({
            color: '#fb4c0b', 
            width: '50',
            height: '60',
        })
        .setLngLat([-58.46183672866482,-34.65030133584823])
        .addTo(map)

        // new tt.Popup({offset: 0, closeButton: false, className: 'map__popUp'})
        //     .setLngLat(new tt.LngLat(-58.46183672866482,-34.65030133584823))
        //     .addTo(map)
        //     .setHTML("<h4 style='text-align: center'> <strong>La <br>Quemita</strong></h4>")

        setMap(map);
        return () => map.remove();
    }, []);
    return (
        <>
            <div ref={mapElement} className="mapDiv"></div>
        </>
    )
}

export default Map