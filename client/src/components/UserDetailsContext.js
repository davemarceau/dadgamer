import { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserDetailsContext = createContext(null);

// **********************************************************
// Context provider
// **********************************************************
const UserDetailsProvider = ({ children }) => {
    const [details, setDetails] = useState(null);
    const { user, isAuthenticated } = useAuth0();

    useEffect(() => {
        if (isAuthenticated) {
            fetch("/getuserdetails/" + user.email)
                .then((data) => data.json())
                .then((data) => {
                    setDetails(data.data);
                })
        }
    }, [user, isAuthenticated])
    
    return (
        <UserDetailsContext.Provider value={{ details, setDetails }}>
            {children}
        </UserDetailsContext.Provider>
    );
}

export default UserDetailsProvider;