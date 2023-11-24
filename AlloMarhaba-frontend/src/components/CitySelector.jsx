import { useState, useEffect } from "react";
import Axios from "axios";

// eslint-disable-next-line react/prop-types
const CitySelector = ({ selectedCountry, onSelectCity }) => {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        if (selectedCountry) {
            setCities([]);
            Axios.get(
                `https://api.countrystatecity.in/v1/countries/${selectedCountry}/cities`,
                {
                    headers: {
                        "X-CSCAPI-KEY":
                            "N0N3OVpvYUdJU1VFV2pQeU9ETVJocVcwVDZ0YXFjeGFpTGhVYUpBQg==",
                    },
                }
            ).then((response) => {
                setCities(response.data);
            });
        }
    }, [selectedCountry]);

    return (
        <select
            onChange={(e) => onSelectCity(e.target.value)}
            name=""
            className="w-80 border-slate-500 border-1 px-2 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
        >
            <option value="">Select a city</option>
            {cities ? (
                cities.map((city) => (
                    <option key={city.id} value={city.name}>
                        {city.name}
                    </option>
                ))
            ) : (
                <option>Select a country and wait </option>
            )}
        </select>
    );
};

export default CitySelector;
