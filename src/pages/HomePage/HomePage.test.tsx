import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock the child components
jest.mock("../../components/ListComponent/ListComponent", () => {
	return {
		ListComponent: jest.fn(() => <div>List Component Mock</div>),
	};
});

jest.mock("../../components/ShowcaseComponent/ShowcaseComponent", () => {
	return {
		ShowcaseComponent: jest.fn(() => <div>Showcase Component Mock</div>),
	};
});

// Import the component and its child components after mocking
import { HomePage } from "./HomePage";
import { ListComponent } from "../../components/ListComponent/ListComponent";
import { ShowcaseComponent } from "../../components/ShowcaseComponent/ShowcaseComponent";

describe("HomePage Component", () => {
	const mockCities = [
		{ id: 1, cityName: "City 1", summary: "Summary 1", image: "ImageURL1" },
		{ id: 2, cityName: "City 2", summary: "Summary 2", image: "ImageURL2" },
	];
	const mockActiveCity = mockCities[0];

	const mockSetActiveCity = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should render correctly and pass correct props to child components", () => {
		render(<HomePage cities={mockCities} activeCity={mockActiveCity} setActiveCity={mockSetActiveCity} />);

		// Assertions to verify if the child components are rendered
		expect(ListComponent).toHaveBeenCalledWith(
			expect.objectContaining({
				cities: mockCities,
				activeCity: mockActiveCity,
				setActiveCity: mockSetActiveCity,
			}),
			expect.anything()
		);

		expect(ShowcaseComponent).toHaveBeenCalledWith(
			expect.objectContaining({
				activeCity: mockActiveCity,
			}),
			expect.anything()
		);

		// Optionally, verify if the mock components' text content renders
		expect(screen.getByText("List Component Mock")).toBeInTheDocument();
		expect(screen.getByText("Showcase Component Mock")).toBeInTheDocument();
	});
});
