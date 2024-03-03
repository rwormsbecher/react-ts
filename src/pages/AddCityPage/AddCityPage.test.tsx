import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AddCityPage } from "./AddCityPage";

// Mock useNavigate hook
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockNavigate,
}));
describe("AddCityPage Component", () => {
	const mockSetCities = jest.fn();
	const mockSetNotification = jest.fn();
	const mockCities = [{ id: 1, cityName: "City A", summary: "Description A", image: "imageA.jpg" }];

	beforeEach(() => {
		// Reset mocks before each test
		mockNavigate.mockClear();
		mockSetCities.mockClear();
		mockSetNotification.mockClear();
	});

	it("submits form and calls setCities and setNotification with correct data", async () => {
		const { getByLabelText, getByRole } = render(
			<AddCityPage setCities={mockSetCities} setNotification={mockSetNotification} cities={mockCities} />
		);

		// Simulate user input
		fireEvent.change(getByLabelText(/Title:/i), { target: { value: "City B" } });
		fireEvent.change(getByLabelText(/Image:/i), { target: { value: "imageB.jpg" } });
		fireEvent.change(getByLabelText(/Description:/i), { target: { value: "Description B" } });

		// Simulate form submission
		fireEvent.submit(getByRole("button", { name: /Add City/i }));

		await waitFor(() => {
			expect(mockSetCities).toHaveBeenCalled();
			expect(mockSetNotification).toHaveBeenCalledWith({
				type: "success",
				text: "City B has been added",
				visible: true,
			});
			// Verify that navigation was attempted
			expect(mockNavigate).toHaveBeenCalledWith("/");
		});
	});

	it("validates input fields and displays error messages for incorrect inputs", async () => {
		const { getByLabelText, findByText, getByRole } = render(
			<AddCityPage setCities={mockSetCities} setNotification={mockSetNotification} cities={mockCities} />
		);

		// Simulate incorrect user input to trigger validation errors
		fireEvent.change(getByLabelText(/Title:/i), { target: { value: "" } }); // Title is required
		fireEvent.change(getByLabelText(/Image:/i), { target: { value: "" } }); // Image URL is required
		fireEvent.change(getByLabelText(/Description:/i), { target: { value: "" } }); // Description is required

		// Attempt to submit form with incorrect inputs
		fireEvent.submit(getByRole("button", { name: /Add City/i }));

		// Check for validation error messages
		await findByText("You must enter a title.");
		await findByText("You must enter an image URL.");
		await findByText("You must enter a description.");

		// Verify that setCities and setNotification were not called due to validation errors
		expect(mockSetCities).not.toHaveBeenCalled();
		expect(mockSetNotification).not.toHaveBeenCalled();
		expect(mockNavigate).not.toHaveBeenCalled();
	});

	it("redirects to the home page on button click", () => {
		const { getByRole } = render(
			<AddCityPage setCities={mockSetCities} setNotification={mockSetNotification} cities={mockCities} />
		);

		// Simulate clicking the cancel button
		fireEvent.click(getByRole("button", { name: /Cancel/i }));

		// Check if navigate was called with the correct argument
		expect(mockNavigate).toHaveBeenCalledWith("/");
	});
});
