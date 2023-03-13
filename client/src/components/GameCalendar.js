// Generic libraries
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
	
import 'react-calendar/dist/Calendar.css';

// Project specific components
import { UserCollectionContext } from "./contexts/UserCollectionContext";
import { UserDetailsContext } from "./contexts/UserDetailsContext";
import AddToCalendar from "./AddToCalendar";
import { UserCalendarContext } from "./contexts/UserCalendarContext";
import EditRemoveInCalendar from "./EditRemoveInCalendar";
import addAvailabilityImage from "./assets/add.png";
import reduceAvailabilityImage from "./assets/remove.png";
import Loading from "./Loading";

// Display information to properly convert the week days and months into text
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const todaysDate = Math.floor(Date.now() / 1000 / 60 / 60 / 24) * 1000 * 60 * 60 * 24;

// **********************************************************
// Calendar component
// **********************************************************
const GameCalendar = () => {
    const { collection } = useContext(UserCollectionContext);
    const { details } = useContext(UserDetailsContext);
    const { calendar, actions: { addSession, removeSession, updatingSession } } = useContext(UserCalendarContext);
    const [addingGame, setAddingGame] = useState(false);
    const [editingGame, setEditingGame] = useState(false);
    const [whereToAdd, setWhereToAdd] = useState(0);
    const [timeToAdd, setTimeToAdd] = useState(0);
    const [gameToAdd, setGameToAdd] = useState(null);
    const [sessionToEdit, setSessionToEdit] = useState(null);
    const [updatedSession, setUpdatedSession] = useState(null);
    const [datePicked, setDatePicked] = useState(Math.floor(Date.now() / 1000 / 60 / 60 / 24) * 1000 * 60 * 60 * 24);
    const [weekData, setWeekData] = useState([]);
    const [calendarTrigger, setCalendarTrigger] = useState(false);
    const [calendarDate, setCalendarDate] = useState(new Date());
    const [sortingType, setSortingType] = useState("alpha");
    const [sortedCollection, setSortedCollection] = useState([]);
    const [search, setSearch] = useState("");

    // Loads the calendar based on week picked
    useEffect(() => {
        setWeekData([]);
        if (datePicked) {
            fetch("/getcalendarweek/" + datePicked)
                .then((data) => data.json())
                .then((data) => {
                    data.data.sort((a, b) => (a.weekDay > b.weekDay) ? 1 : ((b.weekDay > a.weekDay) ? -1 : 0));
                    setWeekData(data.data);
                })
        }
    }, [datePicked]);

    // Assigns the collection to the sorted array on load
    useEffect(() => {
        let tempCollection = [ ...collection.games ];
        tempCollection.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        setSortedCollection([...tempCollection]);
        //setSortedCollection([...collection.games]);
    }, [collection]);

    // Add a new session with info received from the modal
    const addSessionFromModal = ({user, session}) => {
        addSession({user: user, session: session});
    }

    // Edit a session's details with info received from the modal
    const editSessionFromModal = ({user, session}) => {
        updatingSession({user: user, session: session, updatedSession: updatedSession});
    }

    // Deletes a session after confirmation in the modal
    const removeSessionFromModal = ({user, session}) => {
        removeSession({user: user, session: session});
    }

    // Add a game to the week
    const handleAddGame = (game) => {
        setGameToAdd(game);
        setAddingGame(true);
    }

    // Remove a game from a day
    const handleEditSession = (session) => {
        //removeSession({user: details._id, session: session});
        setSessionToEdit(session);
        setUpdatedSession(session);
        setEditingGame(true);
    }

    // Browse to previous week
    const handlePreviousWeek = () => {
        setDatePicked(datePicked - (1000 * 60 * 60 * 24 * 7));
    }

    // Browse to next week
    const handleNextWeek = () => {
        setDatePicked(datePicked + (1000 * 60 * 60 * 24 * 7));
    }

    // Trigger calendar
    const handlePickDate = () => {
        setCalendarTrigger(!calendarTrigger);
    }

    // Triggers the date change when picking from the calendar
    const handleCalendarDayPick = (e) => {
        setCalendarDate(e);
        setDatePicked(Math.floor(Date.parse(e) / 1000 / 60 / 60 / 24) * 1000 * 60 * 60 * 24);
        handlePickDate();
    }

    // **********************************
    // Function handling the sort change
    const handleSortChange = (e) => {
        let tempCollection = [ ...collection.games ];
        switch (e.target.value) {
            // Alphabetical sorting picked
            case "alpha":
                setSortingType("alpha");

                tempCollection.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
                setSortedCollection([...tempCollection]);
                break;
            
            // Release date sorting picked, going descending
            case "releaseDate":
                setSortingType("releaseDate");
                const collectionWithDates = tempCollection.map((game) => {
                    let dateParts = game.releaseDate.split(" ");
                    
                    // allows for single digit dates to be in the right sort order
                    if (dateParts[0].length === 1) {
                        dateParts[0] = "0" + dateParts[0];
                    }

                    const sortableDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
                    return {...game, releaseDateSortable: sortableDate};
                });

                collectionWithDates.sort((a,b) => (a.releaseDateSortable < b.releaseDateSortable) ? 1 : ((b.releaseDateSortable < a.releaseDateSortable) ? -1 : 0));
                setSortedCollection([...collectionWithDates]);
                break;
            
            // Time played sorting picked
            case "timePlayed":
                setSortingType("timePlayed");

                // identifies all past sessions
                const pastSessions = calendar.sessions.filter((session) => {
                    return session.date < todaysDate;
                })

                // compile the duration of sessions played for each game in the collection 
                const eachGameCompiled = tempCollection.map((game) => {
                    game = {...game, totalTimePlayed: 0};
                    pastSessions.forEach((session) => {
                        if (session.game.id === game.id) {
                            game.totalTimePlayed = game.totalTimePlayed + Number(session.duration);
                        }
                    })
                    return game;
                });

                // sort them in descending order
                eachGameCompiled.sort((a, b) => {
                    return b.totalTimePlayed - a.totalTimePlayed;
                });

                setSortedCollection([...eachGameCompiled]);
                break;
            default: {
                setSortedCollection(tempCollection);
            }
        }
    }

    // Function handling the search change
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    // Function handling the search clear
    const handleClear = (e) => {
        setSearch("");
    }

    // **************************
    // Main component render
    // **************************
    if (details && weekData.length > 0 && collection.hasLoaded && calendar.hasLoaded) {
        let totalGames = 0;
        return (
            <Wrapper>
                <WeekPicker>
                    <PreviousNext onClick={handlePreviousWeek} >{"<<"}</PreviousNext>
                    <PreviousNext onClick={handlePickDate} >Pick a date</PreviousNext>
                    <PreviousNext onClick={handleNextWeek} >{">>"}</PreviousNext>
                </WeekPicker>
                {calendarTrigger
                    ? <MyCalendar onClickDay={handleCalendarDayPick} calendarType="US" value={calendarDate} minDate={new Date("2022-01-02")} minDetail="year" />
                    : ""
                }
                <Week>
                    {weekData.map((day, i) => {
                        let sessionsOfTheDay = calendar.sessions.filter((session) => day._id === session.date);
                        let totalAvailableTime = details.availability[i]
                        let timeLeft = details.availability[i];
                        return (
                            <Day key={"day" + i} >
                                <DayOfWeek>{weekDays[day.weekDay]}</DayOfWeek>
                                <DateDay>{day.monthDay} of {monthNames[day.month]}, {day.year}</DateDay>
                                {sessionsOfTheDay.map((session, j) => {
                                    // accounts for availability add when resolving the time left
                                    if (session.game.id === "add") {
                                        timeLeft = timeLeft + session.duration;
                                        totalAvailableTime = totalAvailableTime + session.duration;
                                    } else if (session.game.id === "reduce") {
                                        timeLeft = timeLeft - session.duration;
                                        totalAvailableTime = totalAvailableTime - session.duration;
                                    } else {
                                        timeLeft = timeLeft - session.duration;
                                    }
                                    
                                    return (
                                        <Game onClick={() => handleEditSession (session)} key={i + "_" + j} >
                                            
                                            <Cover src={session.game.cover} />
                                            <GameText>
                                                <Title>{session.game.name}</Title>
                                                <SessionHours>{session.duration}h</SessionHours>
                                            </GameText>
                                        </Game>
                                    )
                                })}
                                <AvailableTime>Total available time: {totalAvailableTime}h</AvailableTime>
                                {timeLeft < 0 
                                ? <TimeLeft className="overbooked" >Time left available: {timeLeft}h</TimeLeft>
                                : <TimeLeft>Time left available: {timeLeft}h</TimeLeft>
                                }
                                
                            </Day>
                        )
                    })}
                </Week>


                <CollectionSorters>
                    <SortPicker>
                        <span>Sort collection by: </span>
                        <PickList id="sortType" placeholder="Pick sort order" value={sortingType ? sortingType : ""} onChange={handleSortChange}>
                                <option value="" disabled >Pick sort order</option>
                                <option value="alpha">Alphabetical</option>
                                <option value="releaseDate">Release Date</option>
                                <option value="timePlayed">Time Played</option>
                        </PickList>
                    </SortPicker>
                    <CollectionSearch placeholder="Search for a game here" value={search} onChange={handleSearchChange} ></CollectionSearch>
                    <ClearSearch onClick={handleClear} >Clear</ClearSearch>
                </CollectionSorters>

                <Collection>
                    <Game key="addAvailability" onClick={() => handleAddGame({id: "add", name: "Add availability", cover: addAvailabilityImage, platforms: "none", releaseDate: "2022-12-05", summary: "Only exists to add availability", timeToBeat: "0", active: true, evergreen: true, url: "/calendar"})} >
                        <Cover src={addAvailabilityImage} />
                        <GameText>
                            <Title>Add availability</Title>
                        </GameText>
                    </Game>
                    <Game key="reduceAvailability" onClick={() => handleAddGame({id: "reduce", name: "Reduce availability", cover: reduceAvailabilityImage, platforms: "none", releaseDate: "2022-12-05", summary: "Only exists to reduce availability", timeToBeat: "0", active: true, evergreen: true, url: "/calendar"})} >
                        <Cover src={reduceAvailabilityImage} />
                        <GameText>
                            <Title>Reduce availability</Title>
                        </GameText>
                    </Game>
                    
                    {sortedCollection.map((game) => {
                        // Calculates time played so far for the game
                        const sessionsSoFar = calendar.sessions.filter((session) => session.game.id === game.id && session.date <= weekData[6]._id);
                        let totalPlayedSoFar = 0;
                        sessionsSoFar.forEach(session => {
                            totalPlayedSoFar = totalPlayedSoFar + Number(session.duration);
                        });
                        const timeLeftToPlay = game.timeToBeat - totalPlayedSoFar;
                        
                        if (game.active && game.name.toLowerCase().includes(search.toLowerCase())) {
                            totalGames++;
                            return (
                                <Game key={game.id} onClick={() => handleAddGame(game)} >
                                    <Cover src={game.cover} />
                                    <GameText>
                                        <Title>{game.name}</Title>
                                        {game.evergreen
                                        ? <LeftToPlay>No time limit</LeftToPlay>
                                        : <LeftToPlay>Time left to play: {timeLeftToPlay}h</LeftToPlay>
                                        }
                                    </GameText>
                                    
                                </Game>
                            );
                        } else {
                            return "";
                        }
                    })}
                    {totalGames ? "" : "No games found"}
                    
                </Collection>
                <AddToCalendar addingGame={addingGame} setAddingGame={() => setAddingGame(!addingGame)} whereToAdd={whereToAdd} setWhereToAdd={setWhereToAdd} timeToAdd={timeToAdd} setTimeToAdd={setTimeToAdd} gameToAdd={gameToAdd} weekData={weekData} monthNames={monthNames} weekDays={weekDays} user={details._id} addSessionFromModal={addSessionFromModal} />
                <EditRemoveInCalendar editingGame={editingGame} setEditingGame={() => setEditingGame(!editingGame)} sessionToEdit={sessionToEdit} setSessionToEdit={setSessionToEdit} updatedSession={updatedSession} setUpdatedSession={setUpdatedSession} weekData={weekData} monthNames={monthNames} weekDays={weekDays} user={details._id} editSessionFromModal={editSessionFromModal} removeSessionFromModal={removeSessionFromModal} />
            </Wrapper>
        );
    } else {
        return (
            <Loading />
        );
    };
    
};

// **********************************************************
// Styled components
// **********************************************************
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    align-items: center;
`

const WeekPicker = styled.div`
    display: flex;
    padding: 5px;
    margin: 5px auto;
`

const PreviousNext = styled.button`
    padding: 5px;
    background-color: transparent;
    color: var(--lighttext);
    border: none;
    margin: 5px;

    &:hover {
        color: var(--lighthover);
    }
`

const MyCalendar = styled(Calendar)`
    position: absolute;
    left: calc(50% - 175px);
    top: 170px;
`

const Week = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: auto;
    margin-right: auto;
`

const Day = styled.div`
    display: flex;
    flex-direction: column;
    border: 2px solid var(--lighttext);
    padding: 5px;
    background-color: var(--darkbackground);
`

const CollectionSorters = styled.div`
    display: flex;
    flex-direction: row;
    padding: 5px;
    height: 30px;
    align-items: center;
    margin-top: 15px;
`

const SortPicker = styled.div`
    display: flex;
    flex-direction: row;
    padding: 5px;
`

const PickList = styled.select`
    width: 170px;
    margin-left: 5px;
    padding: 4px;
    height: 25px;
`

const CollectionSearch = styled.input`
    width: 300px;
    height: 12px;
    padding: 5px;
    margin-left: 5px;
`

const ClearSearch = styled.button`
    background-color: var(--primaryblue);
    width: 42px;
    height: 24px;
    //border-radius: 6px;
    border: none;
    color: var(--lighttext);
    position: relative;
    left: -43px;
    cursor: pointer;

    &:hover {
        background-color: var(--primaryhover);
    }

    &:disabled {
        background-color: var(--darkhover);
        cursor: wait;
    }
`

const Collection = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-left: auto;
    margin-right: auto;
    margin-top: 5px;
`

const Game = styled.button`
    display: flex;
    flex-direction: row;
    border: 1px solid var(--darkhover);
    margin: 5px;
    width: 175px;
    background-color: var(--lightbackground);
    color: var(--darktext);
    padding: 2px;

    &:hover {
        border: 1px solid var(--lighthover);
        color: var(--lighthover);
    }
`

const Cover = styled.img`
    width: 50px;
    height: 60px;
    margin-top: auto;
    margin-bottom: auto;
`

const Title = styled.p`
    font-weight: bold;
    font-size: 12px;
    text-align: left;
    padding: 5px;
`

const AvailableTime = styled.p`
    margin-top: 50px;
    font-size: 11px;
    width: 175px;
`

const TimeLeft = styled.p`
    margin-top: 5px;
    font-size: 11px;
    width: 175px;

    &.overbooked {
        color: red;
    }
`

const GameText = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: auto;
    margin-bottom: auto;
`

const SessionHours = styled.p`
    font-size: 11px;
    text-align: left;
    padding: 5px;
`

const DayOfWeek = styled.p`
    margin-left: auto;
    margin-right: auto;
`

const DateDay = styled.p`
    margin-left: auto;
    margin-right: auto;
    padding: 3px;
    border-bottom: 1px solid var(--lighttext);
    margin-bottom: 3px;
`

const LeftToPlay = styled.p`
    font-size: 12px;
    text-align: left;
    padding: 5px;
`

// **********************************************************
// Export component
// **********************************************************
export default GameCalendar;