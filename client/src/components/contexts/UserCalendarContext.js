// generic libraries
import { createContext, useEffect, useReducer } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// context prep
export const UserCalendarContext = createContext(null);

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
                return (calendarSession.date === action.session.date && calendarSession.game.id === action.session.game.id);
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
                        console.log(data.message);
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    })
                    
                // Updates the Context without waiting for the DB for snappier interaction
                let incrementedCalendar = [...state.sessions];
                incrementedCalendar = [...incrementedCalendar, action.session];
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
					console.log(data.message);

                    
				})
				.catch((error) => {
					console.error("Error:", error);
				})

            // Updates the Context without waiting for the DB for snappier interaction
            let updatedSessions = [...state.sessions];

            const sessionToRemove = updatedSessions.findIndex((calendarSession) => {
                return calendarSession.date === action.session.date && calendarSession.game.id === action.session.game.id;
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
                body: JSON.stringify({ user: action.user, session: action.session, updatedSession: action.updatedSession })
			})
				// remove later	
				.then((data) => data.json())
				.then((data) => {
                    console.log(data.message);
				})
				.catch((error) => {
					console.error("Error:", error);
				})

            let updatingSessions = [...state.sessions];

            const sessionToUpdate = updatingSessions.findIndex((calendarSession) => {
                return calendarSession.date === action.session.date && calendarSession.game.id === action.session.game.id;
            });
    
            updatingSessions[sessionToUpdate] = action.updatedSession;
            return {...state, sessions: [...updatingSessions]};

        // ****************************
        // Removing all sessions of a game removed from the collection
        // ****************************
        case "removeGameFromCollection":

            // Updates the DB
            fetch("/removegamefromsessions", {
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
            let sessionsAfterRemoval = state.sessions.filter((session) => {
                return session.game.id !== action.game.id
            });

            return {...state, sessions: [...sessionsAfterRemoval]};

        // ****************************
        // Loading the user sessions calendar
        // ****************************
        case "loadSessionsCalendar":
            return {...state, hasLoaded: true, sessions: [...action.sessions]};

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
            session: data.session,
            updatedSession: data.updatedSession
        })
    }

    // Remove all sessions with a game when it is removed from the collection
    const removeGameFromCollection = (data) => {
        dispatch({
            type: "removeGameFromCollection",
            user: data.user,
            game: data.game
        })
    }

    // Loads the collection when the user is logged in
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
    
    // **********
    // Main render
    // **********
    return (
        <UserCalendarContext.Provider value={{ calendar, actions: { addSession, removeSession, updatingSession, removeGameFromCollection } }}>
            {children}
        </UserCalendarContext.Provider>
    );
}

// **********************************************************
// Default export of provider
// **********************************************************
export default UserCalendarProvider;