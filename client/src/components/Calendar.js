import styled from "styled-components";
import { useContext, useEffect, useState } from "react";

import { UserCollectionContext } from "./UserCollectionContext";
import { UserDetailsContext } from "./UserDetailsContext";
import AddToCalendar from "./AddToCalendar";
import { UserCalendarContext } from "./UserCalendarContext";

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// **********************************************************
// Calendar component
// **********************************************************
const Calendar = () => {
    const { collection } = useContext(UserCollectionContext);
    const { details } = useContext(UserDetailsContext);
    const { calendar, actions: { addSession, removeSession, updatingSession } } = useContext(UserCalendarContext);
    const [addingGame, setAddingGame] = useState(false);
    const [whereToAdd, setWhereToAdd] = useState(0);
    const [timeToAdd, setTimeToAdd] = useState(0);
    const [gameToAdd, setGameToAdd] = useState(null);
    const [datePicked, setDatePicked] = useState(Math.floor(Date.now() / 1000 / 60 / 60 / 24) * 1000 * 60 * 60 * 24);
    const [weekData, setWeekData] = useState(null);

    // Loads the calendar based on week picked
    useEffect(() => {
        setWeekData([]);
        if (datePicked) {
            fetch("/getcalendarweek/" + datePicked)
                .then((data) => data.json())
                .then((data) => {
                    setWeekData(data.data);
                    console.log(data);
                })
        }
    }, [datePicked]);

    const addSessionFromModal = ({user, session}) => {
        console.log(user, session);
        addSession({user: user, session: session});
    }

    // Add a game to the week
    const handleAddGame = (game) => {
        setGameToAdd(game);
        setAddingGame(true);
    }

    // Remove a game from a day
    const handleRemoveGame = (session) => {
        removeSession({user: details._id, session: session});
    }

    // Browse to previous week
    const handlePreviousWeek = () => {
        setDatePicked(datePicked - (1000 * 60 * 60 * 24 * 7));
    }

    // Browse to next week
    const handleNextWeek = () => {
        setDatePicked(datePicked + (1000 * 60 * 60 * 24 * 7));
    }

    if (details && weekData.length > 0 && collection.hasLoaded && calendar.hasLoaded) {
        return (
            <Wrapper>
                <WeekPicker>
                    <PreviousNext onClick={handlePreviousWeek} >{"<<"}</PreviousNext>
                    Week dropdown here
                    <PreviousNext onClick={handleNextWeek} >{">>"}</PreviousNext>
                </WeekPicker>
                <Week>
                    {weekData.map((day, i) => {
                        let sessionsOfTheDay = calendar.sessions.filter((session) => day._id === session.date);
                        let timeLeft = details.availability[i];
                        return (
                            <Day key={"day" + i} >
                                <DayOfWeek>{weekDays[day.weekDay]}</DayOfWeek>
                                <DateDay>{day.monthDay} of {monthNames[day.month]}, {day.year}</DateDay>
                                {sessionsOfTheDay.map((session, j) => {
                                    timeLeft = timeLeft - session.duration;
                                    //dailyTotalOfSessions = dailyTotalOfSessions + session.duration;
                                    return (
                                        <Game onClick={() => handleRemoveGame (session)} key={i + "_" + j} >
                                            
                                            <Cover src={session.game.cover} />
                                            <GameText>
                                                <Title>{session.game.name}</Title>
                                                <SessionHours>{session.duration}h</SessionHours>
                                            </GameText>
                                        </Game>
                                    )
                                })}
                                <AvailableTime>Total available time: {details.availability[i]}h</AvailableTime>
                                <TimeLeft>Time left available: {timeLeft}h</TimeLeft>
                            </Day>
                        )
                    })}
                </Week>
                <Collection>
                    {collection.games.map((game) => {
                        if (game.active) {
                            return (
                                <Game key={game.id} onClick={() => handleAddGame(game)} >
                                    <Cover src={game.cover} />
                                    <Title>{game.name}</Title>
                                </Game>
                            )
                        }
                    })}
                    
                </Collection>
                <AddToCalendar addingGame={addingGame} setAddingGame={() => setAddingGame(!addingGame)} whereToAdd={whereToAdd} setWhereToAdd={setWhereToAdd} timeToAdd={timeToAdd} setTimeToAdd={setTimeToAdd} gameToAdd={gameToAdd} weekData={weekData} monthNames={monthNames} weekDays={weekDays} user={details._id} addSessionFromModal={addSessionFromModal} />
            </Wrapper>
        );
    } else {
        return (
            "Loading..."
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

const Week = styled.div`
    display: flex;
    flex-direction: row;
`

const Day = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid var(--lighttext);
    padding: 5px;
`

const Collection = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 15px;
`

const Game = styled.button`
    display: flex;
    flex-direction: row;
    border: 1px solid var(--lighttext);
    margin: 5px;
    width: 175px;
    background-color: transparent;
    color: var(--lighttext);

    &:hover {
        border: 1px solid var(--lighthover);
        color: var(--lighthover);
    }
`

const Cover = styled.img`
    width: 50px;
    height: 60px;
`

const Title = styled.p`
    font-size: 14px;
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
`

const GameText = styled.div`
    display: flex;
    flex-direction: column;
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

// **********************************************************
// Export component
// **********************************************************
export default Calendar;