import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { NotificationComponent } from "./NotificationComponent";

describe("NotificationComponent", () => {
	const mockSetNotification = jest.fn();

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should not display notification if visible is false", () => {
		const notification = { type: "success", text: "Test Notification", visible: false };
		render(<NotificationComponent notification={notification} setNotification={mockSetNotification} />);
		expect(screen.queryByText("Test Notification")).not.toBeInTheDocument();
	});

	it("should display notification if visible is true", () => {
		const notification = { type: "success", text: "Test Notification", visible: true };
		render(<NotificationComponent notification={notification} setNotification={mockSetNotification} />);
		expect(screen.getByText("Test Notification")).toBeInTheDocument();
		expect(screen.getByText("X")).toBeInTheDocument();
	});

	it('should call setNotification with correct parameters when "X" is clicked', () => {
		const notification = { type: "success", text: "Test Notification", visible: true };
		render(<NotificationComponent notification={notification} setNotification={mockSetNotification} />);
		fireEvent.click(screen.getByText("X"));
		expect(mockSetNotification).toHaveBeenCalledWith({ type: "success", text: "", visible: false });
	});

	it("should have correct class based on visibility", () => {
		const notification = { type: "success", text: "Success Notification", visible: true };
		render(<NotificationComponent notification={notification} setNotification={mockSetNotification} />);
		expect(screen.getByText("Success Notification").parentNode).toHaveClass("notification-wrapper success");
	});
});
