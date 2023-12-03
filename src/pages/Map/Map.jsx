import { useRef, useEffect, useState } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';

const MapPage = () => {
    const [map, setMap] = useState(null);
    const mapRef = useRef(null);

    const render = (status) => {
        if (status === 'loading') {
            return <div>Loading...</div>;
        }
        if (status === 'loaded') {
            return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
        }
        return <div>Error loading Google Maps</div>;
    };

    useEffect(() => {
        if (mapRef.current && !map) {
            setMap(new window.google.maps.Map(mapRef.current, {
                center: { lat: 0, lng: 0 },
                zoom: 4,
            }));
        }
    }, [map]);

    return (
        <Wrapper apiKey={"AIzaSyB39i6Kh0SoXQxEFnpM81DFNfY6QWfvfE4"} render={render}>
            <div ref={mapRef} style={{ width: '100%', height: '400px' }} />
        </Wrapper>
    );
};

export default MapPage



