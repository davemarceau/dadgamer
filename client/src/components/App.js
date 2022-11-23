import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Homepage from "./Homepage";
import Signin from "./Signin";
import NotFound from "./NotFound";
import Profile from "./Profile";

const App = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();
	const [loaded, setLoaded] = useState(false);

	if (!isLoading) {
		if (isAuthenticated) {
			return (
				<BrowserRouter>
					<GlobalStyles />
					<Header />
					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route path="/signin" element={<Signin />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			)
		} else {
			return (
				<BrowserRouter>
					<GlobalStyles />
					<Header />
					<Routes>
						<Route path="*" element={<Signin />} />
					</Routes>
				</BrowserRouter>
			)
		}
	} else {
		return (
			<BrowserRouter>
			<GlobalStyles />
			<Header />
				<p>Loading...</p>
			</BrowserRouter>
		);
	}
}

export default App;
