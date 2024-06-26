import React from "react";
import { NotificationType } from "../../models/Notification";

interface NotificationComponentProps {
	notification: NotificationType;
	setNotification: React.Dispatch<React.SetStateAction<NotificationType>>;
}

export const NotificationComponent: React.FC<NotificationComponentProps> = ({ notification, setNotification }) => {
	return (
		<div className="notification-container">
			{notification.visible && (
				<div className="notification-wrapper success">
					<span>{notification.text}</span>
					<div onClick={() => setNotification({ type: "success", text: "", visible: false })}>X</div>
				</div>
			)}
		</div>
	);
};
