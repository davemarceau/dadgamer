// generic libraries
import { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// context prep
export const UserDetailsContext = createContext(null);

// **********************************************************
// Context provider
// **********************************************************
const UserDetailsProvider = ({ children }) => {
    const [details, setDetails] = useState(null);
    const { user, isAuthenticated } = useAuth0();

    // Loads the user profile on log in/load
    useEffect(() => {
        if (isAuthenticated) {
            fetch("/getuserdetails/" + user.email)
                .then((data) => data.json())
                .then((data) => {
                    setDetails(data.data);
                    console.log(data.message);
                })
        }
    }, [user, isAuthenticated])
    
    // **************
    // Main render
    // **************
    return (
        <UserDetailsContext.Provider value={{ details, setDetails }}>
            {children}
        </UserDetailsContext.Provider>
    );
}

// **********************************************************
// Default export of provider
// **********************************************************
export default UserDetailsProvider;