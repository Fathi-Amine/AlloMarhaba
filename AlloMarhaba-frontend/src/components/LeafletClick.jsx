import { useEffect, useState } from "react";

import L from "leaflet";

import { useMap } from "react-leaflet";

import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

const LeafletClick = () => {
    const map = useMap();
    const [latlng, setLatlng] = useState({});

    useEffect(() => {
        let marker;
        map.on("click", async function (e) {
            if (marker) {
                map.removeLayer(marker);
            }

            await setLatlng(e.latlng);

            marker = L.marker(e.latlng)
                .addTo(map)
                .bindPopup(e.latlng.toString())
                .openPopup();
        });
    }, [map]);
    console.log(latlng);
    return null;
};

export default LeafletClick;
