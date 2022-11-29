import { createContext, useEffect, useReducer } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserCollectionContext = createContext(null);

const initialCalendar = {sessions: [], hasLoaded: false};

// **********************************************************
// Reducer updating the calendar
// **********************************************************
const reducer = (state, action) => {
    switch (action.type) {

        // ****************************
        // Adding a game session
        // ****************************
        case "addSession":
            
            // validates if session already in calendar
            const alreadyinCalendar = state.sessions.findIndex((calendarSession) => {
                return calendarSession.id === action.session.date && calendarSession.game.id === action.session.game.id;
            })

            // if not adds it
            if (alreadyinCalendar === -1) {
                // Updates the DB
                fetch("/addsession", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({user: action.user, session: action.session})
                })
                    .then((data) => data.json())
                    .then((data) => {
                        //console.log(data);
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    })
                    
                // Updates the Context without waiting for the DB for snappier interaction
                const incrementedCalendar = [...state.session, action.session];
                return {...state, sessions: [...incrementedCalendar]};

            // if it is, it does nothing
            } else {
                return state;
            }

        // ****************************
        // Removing a game session
        // ****************************
        case "removeSession":

            // Updates the DB
            fetch("/removesession", {
				method: "DELETE",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
                body: JSON.stringify({user: action.user, session: action.session})
			})
                .then((data) => data.json())
				.then((data) => {
					console.log(data);

                    
				})
				.catch((error) => {
					console.error("Error:", error);
				})

            // Updates the Context without waiting for the DB for snappier interaction
            let updatedSessions = [...state.sessions];

            const sessionToRemove = updatedSessions.findIndex((calendarSession) => {
                return calendarSession.id === action.session.date && calendarSession.game.id === action.session.game.id;
            });

            updatedSessions.splice(sessionToRemove, 1);
            return {...state, sessions: [...updatedSessions]};
        
        // ****************************
        // Updating a game session
        // ****************************
        case "updatingSession":
            // Updates the db
            fetch("/updatesessiondetails", {
				method: "PATCH",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
                body: JSON.stringify({ user: action.user, session: action.session })
			})
				// remove later	
				.then((data) => data.json())
				.then((data) => {
                    console.log(data);
				})
				.catch((error) => {
					console.error("Error:", error);
				})

            let updatingSessions = [...state.sessions];

            const sessionToUpdate = updatingSessions.findIndex((calendarSession) => {
                return calendarSession.id === action.session.date && calendarSession.game.id === action.session.game.id;
            });
    
            updatingSessions[sessionToUpdate] = action.session;
            return {...state, sessions: [...updatingSessions]};

        // ****************************
        // Loading the user sessions calendar
        // ****************************
        case "loadSessionsCalendar":
            return {...state, hasLoaded: true, sessions: [action.sessions]};

        default:
            console.error("Unexpected action sent to the user calendar");
    }
}

// **********************************************************
// Context provider
// **********************************************************
const UserCalendarProvider = ({ children }) => {
    const [calendar, dispatch] = useReducer(reducer, initialCalendar);
    const { user, isAuthenticated } = useAuth0();

    // Adds a game to the collection
    const addSession = (data) => {
        dispatch({
            type: "addSession",
            user: data.user,
            session: data.session
        })
    }

    // Removes a game from the collection
    const removeSession = (data) => {
        dispatch({
            type: "removeSession",
            user: data.user,
            session: data.session
        })
    }

    // Updates a game from the collection with new information
    const updatingSession = (data) => {
        dispatch({
            type: "updatingSession",
            user: data.user,
            session: data.session
        })
    }

    // Loads the collection when the user is logged im
    useEffect(() => {
        if (isAuthenticated) {
            fetch("/getsessionscalendar/" + user.email)
                .then((data) => data.json())
                .then((data) => {
                    dispatch({
                        type: "loadSessionsCalendar",
                        sessions: data.data
                    })  
                })
        }
    }, [user, isAuthenticated])
    
    return (
        <UserCollectionContext.Provider value={{ calendar, actions: { addSession, removeSession, updatingSession } }}>
            {children}
        </UserCollectionContext.Provider>
    );
}

export default UserCalendarProvider;