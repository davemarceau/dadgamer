import { createContext, useEffect, useReducer } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserCollectionContext = createContext(null);

const initialCollection = [];

// **********************************************************
// Reducer updating the collection
// **********************************************************
const reducer = (state, action) => {
    switch (action.type) {
        
        // ****************************
        // Adding a game
        // ****************************
        case "addGame": 
            // Updates the DB
            fetch("/addgame", {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
                body: action.game
			})
                .then((data) => data.json())
				.then((data) => {
					console.log(data);
				})
				.catch((error) => {
					console.error("Error:", error);
				})

            // Updates the Context
            return [
                ...state,
                action.game,
            ]
        

        // ****************************
        // Removing a game
        // ****************************
        case "removeGame":
            // Updates the DB
            fetch("/removegame", {
				method: "DELETE",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
                body: action.game
			})
                .then((data) => data.json())
				.then((data) => {
					console.log(data);
				})
				.catch((error) => {
					console.error("Error:", error);
				})

            // Updates the Context
            let updatedGames = [...state];
            const gameToRemove = updatedGames.findIndex((game) => {
                return game.id = action.game.id;
            });
            updatedGames.splice(gameToRemove, 1);
            return [...updatedGames];
        

        // ****************************
        // Loading the user collection
        // ****************************
        case "loadCollection": 
            return action.collection;
        

        default:
            console.error("Unexpected action sent to the game collection.");
    }
}

// **********************************************************
// Context provider
// **********************************************************
const UserCollectionProvider = ({ children }) => {
    const [collection, dispatch] = useReducer(reducer, initialCollection);
    const { user, isAuthenticated } = useAuth0();

    // Adds a game to the collection
    const addGame = (data) => {
        dispatch({
            type: "addGame",
            game: data
        })
    }

    // Removes a game from the collection
    const removeGame = (data) => {
        dispatch({
            type: "removeGame",
            game: data
        })
    }

    // Loads the collection when the user is logged im
    useEffect(() => {
        if (isAuthenticated) {
            fetch("/getcollection/" + user.email)
                .then((data) => data.json())
                .then((data) => {
                    dispatch({
                        type: "loadCollection",
                        collection: data.data
                    })  
                })
        }
    }, [user, isAuthenticated])
    
    return (
        <UserCollectionContext.Provider value={{ collection, actions: { addGame, removeGame } }}>
            {children}
        </UserCollectionContext.Provider>
    );
}

export default UserCollectionProvider;