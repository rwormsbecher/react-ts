import React from "react";
import { NavLink } from "react-router-dom";

export const HeaderComponent: React.FC = () => {
	return (
		<>
			<div className="header-container">
				<div className="logo">Boot Finder</div>
				<div>
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive ? "p-2 text-decoration-none active" : "p-2 text-decoration-none"
						}
					>
						Home
					</NavLink>
					<NavLink
						to="/add"
						className={({ isActive }) =>
							isActive ? "p-2 text-decoration-none active" : "p-2 text-decoration-none"
						}
					>
						Add camp
					</NavLink>
				</div>
			</div>
		</>
	);
};
