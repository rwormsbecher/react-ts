import { useState, useEffect } from "react";
import { City } from "./models/City";
import { CitiesApiResponse } from "./models/CitiesApiResponse";

export const useFetchCities = () => {
	const [cities, setCities] = useState<City[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [activeCity, setActiveCity] = useState<City>({} as City);
	const [error, setError] = useState<string>();

	useEffect(() => {
		const fetchCities = async () => {
			try {
				const response = await fetch("https://greensocapi.azurewebsites.net/api/Cities");
				const data: CitiesApiResponse = await response.json();
				setCities(data.cities);
				setActiveCity(data.cities[0]);
			} catch (err) {
				setError("An error occured");
			} finally {
				setLoading(false);
			}
		};

		if (cities.length === 0) {
			fetchCities();
		}
	}, [cities]);

	return { cities, setCities, loading, activeCity, error, setActiveCity };
};
