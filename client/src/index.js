// General libraries
import { Auth0Provider } from "@auth0/auth0-react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

// Contexts required for the application to work efficiently
import UserDetailsProvider from "./components/UserDetailsContext";
import UserCollectionProvider from "./components/UserCollectionContext";
import CalendarProvider from "./components/CalendarContext";

// ******************************************************
// Application render
// ******************************************************
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Auth0Provider
		domain="dev-as5wjuc8jh0e5zt7.us.auth0.com"
		clientId="Bb3GApW9LkFDKijeaRj6vR3wf2mlpjfw"
		redirectUri={window.location.origin}>
		<UserDetailsProvider>
			<UserCollectionProvider>
				<CalendarProvider>
					<App />
				</CalendarProvider>
			</UserCollectionProvider>
		</UserDetailsProvider>
	</Auth0Provider>
);

