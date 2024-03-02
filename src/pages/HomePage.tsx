import React from "react";
import { ListComponent } from "../components/ListComponent";
import { ShowcaseComponent } from "../components/ShowcaseComponent";
import { City } from "../models/City";

interface IHomePageProps {
	setActiveCity: React.Dispatch<React.SetStateAction<City>>;
	activeCity: City;
	cities: City[];
}

export const HomePage: React.FC<IHomePageProps> = ({ cities, setActiveCity, activeCity }) => {
	return (
		<React.Fragment>
			<nav>
				<ListComponent cities={cities} activeCity={activeCity} setActiveCity={setActiveCity} />
			</nav>
			<ShowcaseComponent activeCity={activeCity} />
		</React.Fragment>
	);
};
