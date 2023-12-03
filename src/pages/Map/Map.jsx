import MapMarker from "../../components/MapMarker/MapMarker"
import MapPlace from "../../components/MapPlace/MapPlace"

const Map = () => {
    return (
        <div>
            <h1>Mapas</h1>
            <MapMarker />
            <MapPlace />
        </div>
    )
}

export default Map

//   {"AIzaSyB39i6Kh0SoXQxEFnpM81DFNfY6QWfvfE4"} >




// import React, { useEffect, useState } from 'react';
// import { APIProvider, Map, Marker, useMarkerRef, useMapsLibrary } from '@vis.gl/react-google-maps';

// const MyMap = () => {
//     const [markerRef, marker] = useMarkerRef();
//     const mapStyle = {
//         height: '400px',
//         width: '100%'
//     };

//     useEffect(() => {
//         if (!marker) {
//             return;
//         }

//         // Aquí puedes realizar acciones específicas cuando el marcador está disponible
//         // Por ejemplo, agregar un evento de clic al marcador
//         marker.addListener('click', () => {
//             console.log('Marcador clickeado!');
//         });
//     }, [marker]);

//     return (
//         <APIProvider apiKey={'TuClaveDeAPI'}>
//             <Map zoom={12} center={{ lat: 53.54992, lng: 10.00678 }} style={mapStyle}>
//                 <Marker ref={markerRef} position={{ lat: 53.54992, lng: 10.00678 }} />
//             </Map>
//         </APIProvider>
//     );
// };
// --------------------------------------------------------------------------------------------
// const MyComponent = () => {
//     const placesLibrary = useMapsLibrary('places');
//     const [placesService, setPlacesService] = useState(null);

//     useEffect(() => {
//         if (!placesLibrary) return;

//         setPlacesService(new placesLibrary.PlacesService());
//     }, [placesLibrary]);

//     useEffect(() => {
//         if (!placesService) return;

//         // ...usa placesService...
//     }, [placesService]);

//     return <></>;
// };
// -------------------------------------------------------------------------------------------------
// const App = () => {
//     return (
//         <div>
//             <h1>My App</h1>
//             <MyMap />
//             <MyComponent />
//         </div>
//     );
// };

// export default App;
