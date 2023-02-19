// generic libraries
import { createContext, useEffect, useReducer } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// preps the context
export const UserCollectionContext = createContext(null);

const initialCollection = {games: [], hasLoaded: false};

// **********************************************************
// Reducer updating the collection
// **********************************************************
const reducer = (state, action) => {
    switch (action.type) {
        
        // ****************************
        // Adding a game
        // ****************************
        case "addGame": 
            
            // validates if game already in collection
            const alreadyinCollection = state.games.findIndex((collectionGame) => {
                return collectionGame.id === action.game.id;
            })

            // if not adds it
            if (alreadyinCollection === -1) {
                // Updates the DB
                fetch("/addgame", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({user: action.user, game: action.game})
                })
                    .then((data) => data.json())
                    .then((data) => {
                        console.log(data.message);
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    })
                    
                // Updates the Context without waiting for the DB for snappier interaction
                const incrementedGames = [...state.games, action.game];
                return {...state, games: [...incrementedGames]};

            // if it is, it does nothing
            } else {
                return state;
            }
            
        
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
                body: JSON.stringify({user: action.user, game: action.game})
			})
                .then((data) => data.json())
				.then((data) => {
					console.log(data.message);

                    
				})
				.catch((error) => {
					console.error("Error:", error);
				})

            // Updates the Context without waiting for the DB for snappier interaction
            let updatedGames = [...state.games];

            const gameToRemove = updatedGames.findIndex((game) => {
                return game.id === action.game.id;
            });

            updatedGames.splice(gameToRemove, 1);
            return {...state, games: [...updatedGames]};
        
        // ****************************
        // Updating a game
        // ****************************
        case "updateGame":
            // Updates the db
            fetch("/updateplannedgametime", {
				method: "PATCH",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
                body: JSON.stringify({ user: action.user, game: action.game })
			})
				// remove later	
				.then((data) => data.json())
				.then((data) => {
                    console.log(data.message);
				})
				.catch((error) => {
					console.error("Error:", error);
				})

            let updatingGames = [...state.games];

            const gameToUpdate = updatingGames.findIndex((game) => {
                return game.id === action.game.id;
            });
    
            updatingGames[gameToUpdate] = action.game;
            return {...state, games: [...updatingGames]};

        // ****************************
        // Loading the user collection
        // ****************************
        case "loadCollection": 
            return {...state, hasLoaded: true, games: action.collection};
        

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
            user: data.user,
            game: data.game
        })
    }

    // Removes a game from the collection
    const removeGame = (data) => {
        dispatch({
            type: "removeGame",
            user: data.user,
            game: data.game
        })
    }

    // Updates a game from the collection with new information
    const updateGame = (data) => {
        dispatch({
            type: "updateGame",
            user: data.user,
            game: data.game
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
    
    // ************
    // Main render
    // ************
    return (
        <UserCollectionContext.Provider value={{ collection, actions: { addGame, removeGame, updateGame } }}>
            {children}
        </UserCollectionContext.Provider>
    );
}

// **********************************************************
// Default export of the provider
// **********************************************************
export default UserCollectionProvider;