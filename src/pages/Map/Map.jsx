import MapMarker from "../../components/MapMarker/MapMarker"
import './Map.css'


const Map = () => {
    return (
        <div>
            <h1 className="text-center">Busca tu evento por cercania</h1>
            <MapMarker />
        </div>
    )
}

export default Map

