import { render, fireEvent } from "@testing-library/react";
import { ListItemComponent } from "./ListItemComponent";
import { City } from "../../models/City";

// Mock setActiveCity function
const mockSetActiveCity = jest.fn();

describe("ListItemComponent", () => {
	const city1: City = { id: 1, cityName: "City 1", summary: "Summary 1", image: "ImageURL1" };
	const city2: City = { id: 2, cityName: "City 2", summary: "Summary 2", image: "ImageURL2" };

	const activeCity: City = city1;

	it("renders the city name correctly", () => {
		const { getByText } = render(
			<ListItemComponent city={city1} activeCity={activeCity} setActiveCity={mockSetActiveCity} />
		);

		expect(getByText(city1.cityName)).toBeInTheDocument();
	});

	it("adds 'active-city' class to active city", () => {
		const { container } = render(
			<ListItemComponent city={city1} activeCity={activeCity} setActiveCity={mockSetActiveCity} />
		);

		expect(container.firstChild).toHaveClass("active-city");
	});

	it("does not add 'active-city' class to inactive city", () => {
		const { container } = render(
			<ListItemComponent city={city2} activeCity={activeCity} setActiveCity={mockSetActiveCity} />
		);

		expect(container.firstChild).not.toHaveClass("active-city");
	});

	it("calls setActiveCity when clicked", () => {
		const { getByText } = render(
			<ListItemComponent city={city1} activeCity={activeCity} setActiveCity={mockSetActiveCity} />
		);

		fireEvent.click(getByText(city1.cityName));
		expect(mockSetActiveCity).toHaveBeenCalledWith(city1);
	});
});
