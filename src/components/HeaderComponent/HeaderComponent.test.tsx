import { render, screen } from "@testing-library/react";
import { HeaderComponent } from "./HeaderComponent";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("HeaderComponent", () => {
	const renderComponent = (initialRoute = "/") => {
		render(
			<MemoryRouter initialEntries={[initialRoute]}>
				<Routes>
					<Route path="*" element={<HeaderComponent />} />
				</Routes>
			</MemoryRouter>
		);
	};

	test("renders the component with the logo", () => {
		renderComponent();
		expect(screen.getByText("Boot Finder")).toBeInTheDocument();
	});
	test("renders the component with the 2 links", () => {
		renderComponent();
		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("Add camp")).toBeInTheDocument();
	});

	test("NavLink to Home should have correct class when active", () => {
		renderComponent("/");
		const homeLink = screen.getByText("Home");
		expect(homeLink).toHaveClass("active");
	});

	test("NavLink to Add camp should have correct class when active", () => {
		renderComponent("/add");
		const addCampLink = screen.getByText("Add camp");
		expect(addCampLink).toHaveClass("active");
	});

	test("Home link should not be active when on add page", () => {
		renderComponent("/add");
		const homeLink = screen.getByText("Home");
		const addCampLink = screen.getByText("Add camp");
		expect(homeLink).not.toHaveClass("active");
		expect(addCampLink).toHaveClass("active");
	});
});
