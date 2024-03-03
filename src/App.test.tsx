import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { useFetchCities } from "./useFetchCities";
import { City } from "./models/City";

// Mock components and hooks
jest.mock("./useFetchCities", () => ({
	useFetchCities: jest.fn(),
}));

jest.mock("./components/NotificationComponent/NotificationComponent", () => ({
	NotificationComponent: () => <div>MockNotificationComponent</div>,
}));

jest.mock("./components/HeaderComponent/HeaderComponent", () => ({
	HeaderComponent: () => <div>MockHeaderComponent</div>,
}));

jest.mock("./pages/HomePage/HomePage", () => ({
	HomePage: () => <div>MockHomePage</div>,
}));

jest.mock("./pages/AddCityPage/AddCityPage", () => ({
	AddCityPage: () => <div>MockAddCityPage</div>,
}));

describe("App component tests", () => {
	beforeEach(() => {
		// Reset all mocks before each test
		jest.clearAllMocks();
	});

	it("renders loading state correctly", async () => {
		(useFetchCities as jest.Mock).mockImplementation(() => ({
			cities: [],
			setCities: jest.fn(),
			loading: true,
			activeCity: {} as City,
			error: undefined,
			setActiveCity: jest.fn(),
		}));

		render(
			<MemoryRouter>
				<App />
			</MemoryRouter>
		);

		expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
	});

	it("renders error state correctly", async () => {
		(useFetchCities as jest.Mock).mockImplementation(() => ({
			cities: [],
			setCities: jest.fn(),
			loading: false,
			activeCity: {} as City,
			error: "Error: Test error",
			setActiveCity: jest.fn(),
		}));

		render(
			<MemoryRouter>
				<App />
			</MemoryRouter>
		);

		expect(screen.getByText(/Error: Test error/i)).toBeInTheDocument();
	});

	it("renders the homepage route correctly", async () => {
		(useFetchCities as jest.Mock).mockImplementation(() => ({
			cities: [],
			setCities: jest.fn(),
			loading: false,
			activeCity: {} as City,
			error: undefined,
			setActiveCity: jest.fn(),
		}));

		render(
			<MemoryRouter initialEntries={["/"]}>
				<App />
			</MemoryRouter>
		);

		expect(screen.getByText(/MockHomePage/i)).toBeInTheDocument();
	});

	it("renders the add city page route correctly", async () => {
		(useFetchCities as jest.Mock).mockImplementation(() => ({
			cities: [],
			setCities: jest.fn(),
			loading: false,
			activeCity: {} as City,
			error: undefined,
			setActiveCity: jest.fn(),
		}));

		render(
			<MemoryRouter initialEntries={["/add"]}>
				<App />
			</MemoryRouter>
		);

		expect(screen.getByText(/MockAddCityPage/i)).toBeInTheDocument();
	});
});
