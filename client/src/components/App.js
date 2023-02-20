// generic libraries
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

// project specific components
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Signin from "./Signin";
import SubHeader from "./SubHeader";
import Loading from "./Loading";
import MainContent from "./MainContent";

// *****************************************************************
// Generates the app
// *****************************************************************
const App = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	// Checks if user already exists. If not, it creates it
	useEffect(() => {
		if (isAuthenticated) {
			fetch("/checknewuser/" + user.email, {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				}
			})
				.then((data) => data.json())
				.then((data) => {
					console.log(data.message);
				})
				.catch((error) => {
					console.error("Error:", error);
				})
		}
	}, [user, isAuthenticated]);

	const definedRoute = () => {
		if (!isLoading) {
			if (isAuthenticated) {
				return <Route path="/*" element={<MainContent />} />
			} else {
				return <Route path="*" element={<Signin />} />
			}
		} else {
			return <Route path="*" element={<Loading />} />
		}
	}

	return (
		<BrowserRouter>
			<GlobalStyles />
			<Header />
			<SubHeader />
			<Routes>
				{definedRoute()}
			</Routes>
		</BrowserRouter>
	)

	// Checks if user is still loading before chossing what routes to apply
	/*if (!isLoading) {
		
		// If user is logged in, it will allow site navigation
		if (isAuthenticated) {
			return (
				<BrowserRouter>
					<GlobalStyles />
					<Header />
					<SubHeader />
					<Routes>
						<Route path="/*" element={<MainContent />} />
					</Routes>
				</BrowserRouter>
			)
		
		// If user is not logged in, it will ask for sign in
		} else {
			return (
				<BrowserRouter>
					<GlobalStyles />
					<Header />
					<SubHeader />
					<Routes>
						<Route path="*" element={<Signin />} />
					</Routes>
				</BrowserRouter>
			)
		}

	// Displays loading if user is still loading
	} else {
		return (
			<BrowserRouter>
			<GlobalStyles />
			<Header />
			<SubHeader />
				<Loading />
			</BrowserRouter>
		);
	}*/
}

// *****************************************************************
// Default export
// *****************************************************************
export default App;
