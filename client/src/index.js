// General libraries
import { Auth0Provider } from "@auth0/auth0-react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

// Contexts required for the application to work efficiently
import UserDetailsProvider from "./components/contexts/UserDetailsContext";
import UserCollectionProvider from "./components/contexts/UserCollectionContext";
import UserCalendarProvider from "./components/contexts/UserCalendarContext";

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
				<UserCalendarProvider>
					<App />
				</UserCalendarProvider>
			</UserCollectionProvider>
		</UserDetailsProvider>
	</Auth0Provider>
);

