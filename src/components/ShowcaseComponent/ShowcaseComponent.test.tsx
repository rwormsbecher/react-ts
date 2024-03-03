// ShowcaseComponent.test.tsx
import { render, screen } from "@testing-library/react";
import { ShowcaseComponent } from "./ShowcaseComponent"; // Adjust the import path as necessary
import "@testing-library/jest-dom";

const mockCity = {
	id: 1,
	cityName: "Amsterdam",
	summary: "A great city with canals",
	image: "",
};

describe("ShowcaseComponent", () => {
	test("it displays the correct city name and summary", () => {
		render(<ShowcaseComponent activeCity={mockCity} />);
		expect(screen.getByRole("heading", { name: mockCity.cityName })).toBeInTheDocument();
		expect(screen.getByText(mockCity.summary)).toBeInTheDocument();
	});

	test("it displays the correct image for a given city", () => {
		render(<ShowcaseComponent activeCity={mockCity} />);
		const img = screen.getByRole("img", { name: mockCity.cityName });

		screen.logTestingPlaygroundURL();
		expect(img).toHaveAttribute("src");
		expect(img).toHaveAttribute("alt", mockCity.cityName);
	});

	const cities = [
		{ cityName: "Amsterdam", summary: "A great city with canals", image: "", id: 1 },
		{ cityName: "Shenzhen", summary: "A tech hub", image: "", id: 2 },
		{ cityName: "London", summary: "A historical city", image: "", id: 3 },
		{ cityName: "Mumbai", summary: "The city of dreams", image: "", id: 4 },
		{ cityName: "Sacramento", summary: "The capital of California", image: "", id: 5 },
		{ cityName: "nieuwegein", summary: "A city in the Netherlands", image: "", id: 6 },
	];

	describe("ShowcaseComponent with different cities", () => {
		test.each(cities)("displays the correct image and summary for $cityName", (city) => {
			render(<ShowcaseComponent activeCity={city} />);
			const image = screen.getByRole("img", { name: city.cityName });
			expect(image).toHaveAttribute("alt", city.cityName);
			expect(screen.getByText(city.summary)).toBeInTheDocument();
		});

		test("uses activeCity.image when city is not predefined", () => {
			const fallbackCity = {
				cityName: "Some Other City",
				summary: "A city not in the list",
				image: "fallback-image.jpg",
				id: 7,
			};
			render(<ShowcaseComponent activeCity={fallbackCity} />);
			const image = screen.getByRole("img", { name: fallbackCity.cityName });
			expect(image).toHaveAttribute("alt", fallbackCity.cityName);
			expect(screen.getByText(fallbackCity.summary)).toBeInTheDocument();
		});
	});
});
