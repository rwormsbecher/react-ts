import { renderHook, waitFor } from "@testing-library/react";
import { useFetchCities } from "./useFetchCities";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("useFetchCities custom hook", () => {
	beforeEach(() => {
		fetchMock.mockClear();
	});

	it("should fetch cities successfully", async () => {
		const mockCities = [
			{ id: 1, name: "City A" },
			{ id: 2, name: "City B" },
		];
		fetchMock.mockResponseOnce(JSON.stringify({ cities: mockCities }));

		const { result } = renderHook(() => useFetchCities());
		expect(result.current.loading).toBeTruthy();

		await waitFor(() => expect(result.current.loading).toBeFalsy());
		expect(result.current.cities.length).toBeGreaterThan(0);
		expect(result.current.activeCity).toBeDefined();
		expect(result.current.error).toBeUndefined();
	});

	it("should handle fetch error", async () => {
		fetchMock.mockReject(new Error("An error occurred"));

		const { result } = renderHook(() => useFetchCities());
		expect(result.current.loading).toBeTruthy();

		await waitFor(() => expect(result.current.loading).toBeFalsy());
		expect(result.current.cities).toEqual([]);
		expect(result.current.error).toBeDefined();
	});
});
