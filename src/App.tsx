import { useState } from "react";

import { NotificationType } from "./models/Notification";
import { NotificationComponent } from "./components/NotificationComponent/NotificationComponent";
import { HeaderComponent } from "./components/HeaderComponent/HeaderComponent";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { AddCityPage } from "./pages/AddCityPage/AddCityPage";
import { useFetchCities } from "./useFetchCities";

function App() {
	const [notification, setNotification] = useState<NotificationType>({} as NotificationType);

	const { cities, setCities, loading, activeCity, error, setActiveCity } = useFetchCities();

	if (loading) return <div className="App">Loading...</div>;
	if (error) return <div className="App">Error: {error}</div>;

	return (
		<div>
			<HeaderComponent></HeaderComponent>
			<NotificationComponent setNotification={setNotification} notification={notification} />
			<div className="App">
				<Routes>
					<Route
						path="/"
						element={<HomePage cities={cities} activeCity={activeCity} setActiveCity={setActiveCity} />}
					/>
					<Route
						path="/add"
						element={
							<AddCityPage setCities={setCities} setNotification={setNotification} cities={cities} />
						}
					/>
				</Routes>
			</div>
		</div>
	);
}

export default App;
