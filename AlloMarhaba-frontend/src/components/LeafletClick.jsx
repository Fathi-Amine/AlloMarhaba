import { useEffect, useState } from "react";

import L from "leaflet";

import { useMap } from "react-leaflet";

import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { useDispatch } from "react-redux";
import { setCoordinates } from "../slices/mapSlice";

const LeafletClick = () => {
    const map = useMap();
    const [latlng, setLatlng] = useState({});
    const dispatch = useDispatch();

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

            // console.log(e.latlng);
            dispatch(
                setCoordinates({
                    lat: e.latlng.lat,
                    lng: e.latlng.lng,
                })
            );
        });
    }, [map, dispatch, latlng]); // Include latlng in dependency array

    // console.log(latlng);
    return null;
};

export default LeafletClick;
