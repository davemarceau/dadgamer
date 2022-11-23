import { Auth0Provider } from "@auth0/auth0-react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
	<Auth0Provider
		domain="dev-as5wjuc8jh0e5zt7.us.auth0.com"
		clientId="Bb3GApW9LkFDKijeaRj6vR3wf2mlpjfw"
		redirectUri={window.location.origin}
	>
		<App />
	</Auth0Provider>
	</React.StrictMode>
);

