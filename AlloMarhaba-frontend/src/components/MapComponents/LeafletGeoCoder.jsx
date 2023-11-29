import {useEffect} from 'react';
import L from "leaflet"
import {Marker, Popup, useMap} from "react-leaflet";
import PropTypes from "prop-types";



const LeafletGeoCoder = ({ markerLocations }) => {
    const map = useMap()
    useEffect(() => {
        if (markerLocations && Array.isArray(markerLocations)) {
            if (markerLocations.length > 0) {
                const bounds = L.latLngBounds(markerLocations.map((location) => [location.latitude, location.longitude]));
                map.fitBounds(bounds);
            }
        }
    }, [map, markerLocations]);
    // useEffect(() => {
    //
    //     if (markerLocations && Array.isArray(markerLocations)) {
    //         markerLocations.forEach((location) => {
    //             console.log(location)
    //             if (location.latitude && location.longitude) {
    //                 const latLng = [location.latitude, location.longitude];
    //                 const marker = L.marker(latLng)
    //                     .addTo(map)
    //                     .bindPopup(`<div>
    //                         <h3>${location.name}</h3>
    //                         <p>Phone: ${location.cuisineType.name}</p>
    //
    //                         <!-- Add more details as needed
    //                         <img src={${rp}/${location.image}} alt={}></img>-->
    //                     </div>`)
    //                     .openPopup()
    //                     .on('click',() => handleMarkerClick(location));
    //             }
    //         });
    //
    //         if (markerLocations.length > 0) {
    //             const bounds = L.latLngBounds(markerLocations.map((location) => [location.latitude, location.longitude]));
    //             map.fitBounds(bounds);
    //         }
    //     }
    // }, [map, markerLocations]);

    return (
        <>
            {markerLocations.map((location, index) => (
                <Marker
                    key={index}
                    position={[location.latitude, location.longitude]}

                >
                    <Popup>
                        <div>
                            <b>{location.name}</b><br />
                            <h3>{location.name}</h3>
                            <p>Phone: {location.cuisineType.name}</p>
                            {/* Add more details as needed */}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    );
};

LeafletGeoCoder.propTypes = {
    markerLocations: PropTypes.arrayOf(PropTypes.shape({
        latitude: PropTypes.string.isRequired,
        longitude: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        cuisineType: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    })).isRequired,
};

export default LeafletGeoCoder;