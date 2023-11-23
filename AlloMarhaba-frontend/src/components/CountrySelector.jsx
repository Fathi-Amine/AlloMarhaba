import { useState, useEffect } from "react";
import Axios from "axios";

// eslint-disable-next-line react/prop-types
const CountrySelector = ({ onSelectCountry }) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const config = {
            cUrl: "https://api.countrystatecity.in/v1/countries",
            ckey: "N0N3OVpvYUdJU1VFV2pQeU9ETVJocVcwVDZ0YXFjeGFpTGhVYUpBQg==",
        };

        Axios.get(config.cUrl, {
            headers: {
                "X-CSCAPI-KEY": config.ckey,
            },
        }).then((response) => {
            setCountries(response.data);
        });
    }, []);

    return (
        <select
            onChange={(e) => onSelectCountry(e.target.value)}
            name=""
            className="w-80 border-slate-500 border-1 px-2 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
        >
            <option value="">Select a country</option>
            {countries ? (
                countries.map((country) => (
                    <option key={country.iso2} value={country.iso2}>
                        {country.name}
                    </option>
                ))
            ) : (
                <option>wait till loading</option>
            )}
        </select>
    );
};

export default CountrySelector;
