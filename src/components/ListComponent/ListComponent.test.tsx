import React from "react";
import { render, screen } from "@testing-library/react";
import { ListComponent } from "./ListComponent";
import "@testing-library/jest-dom";
import { City } from "../../models/City"; // Adjust the import path as necessary

// Define the props expected by ListItemComponent
interface ListItemProps {
	city: City;
	setActiveCity: React.Dispatch<React.SetStateAction<City>>;
	activeCity: City;
}

// Mock ListItemComponent with proper TypeScript annotations
jest.mock("../ListItemComponent/ListItemComponent", () => {
	// Creating a mock functional component that mimics ListItemComponent
	const MockListItemComponent = ({ city, setActiveCity }: ListItemProps) => (
		<li data-testid="mock-list-item" data-city-id={city.id} onClick={() => setActiveCity(city)}>
			Mock City: {city.cityName}
		</li>
	);
	// Named export to match the original component's export
	return { ListItemComponent: MockListItemComponent };
});

describe("ListComponent", () => {
	const mockCities = [
		{ id: 1, cityName: "City 1", summary: "Summary 1", image: "ImageURL1" },
		{ id: 2, cityName: "City 2", summary: "Summary 2", image: "ImageURL2" },
	];

	const mockActiveCity = mockCities[0];
	const mockSetActiveCity = jest.fn();

	it("renders a list item for each city", () => {
		render(<ListComponent cities={mockCities} activeCity={mockActiveCity} setActiveCity={mockSetActiveCity} />);
		screen.logTestingPlaygroundURL();

		const listItems = screen.getAllByTestId("mock-list-item");
		expect(listItems).toHaveLength(mockCities.length);
		mockCities.forEach((city, index) => {
			expect(listItems[index]).toHaveTextContent(`Mock City: ${city.cityName}`);
			expect(listItems[index]).toHaveAttribute("data-city-id", city.id.toString());
		});
	});
});
