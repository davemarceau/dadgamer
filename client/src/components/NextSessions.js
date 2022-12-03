import styled from "styled-components";
import { useContext } from "react";

import { UserCalendarContext } from "./UserCalendarContext";
import Loading from "./Loading";

const todaysDate = Math.floor(Date.now() / 1000 / 60 / 60 / 24) * 1000 * 60 * 60 * 24;

// Display information to properly convert the week days and months into text
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// **********************************************
// Finds the next 3 sessions to display on the homepage
// **********************************************
const NextSessions = () => {
    const { calendar } = useContext(UserCalendarContext);

    // find sessions that are today or later
    const upcomingSessions = calendar.sessions.filter((session) => {
        return session.date >= todaysDate;
    })

    // sort the sessions by date
    upcomingSessions.sort((a, b) => a.date - b.date);

    // keep the next 3
    const next3 = upcomingSessions.slice(0, 3);

    // render if calendar has loaded
    if (calendar.hasLoaded) {
        return (
            <Wrapper>
                <SectionTitle>Your next 3 play sessions</SectionTitle>
                {next3.map((session) => {
                    const formattedDate = new Date(session.date);
                    
                    const monthDay = formattedDate.getUTCDate();
                    const weekDay = formattedDate.getUTCDay();
                    const month = formattedDate.getUTCMonth();
                    
                    return (
                        <Game key={session.game.id} >
                            <Link href={session.game.url} target="_blank" ><Cover src={session.game.cover} /></Link>
                            <GameText>
                                <Link href={session.game.url} target="_blank" ><Title>{session.game.name}</Title></Link>
                                {todaysDate === session.date
                                    ? <SessionTime>Today</SessionTime>
                                    : <SessionTime>{weekDays[weekDay]}, {monthDay} of {monthNames[month]}</SessionTime>
                                }
                                <SessionDuration>Duration: {session.duration}h</SessionDuration>
                            </GameText>
                        </Game>
                    )
                })}
                <Link href="/calendar"><CalendarButton>See more in your calendar</CalendarButton></Link>
            </Wrapper>
        )
    // otherwise display loading
    } else {
        <Loading />
    }
    
}

// **********************************************
// Styled components
// **********************************************
const Wrapper = styled.div`
    background-color: var(--darkbackground);
    color: var(--lighttext);
    display: flex;
    flex-direction: column;
    padding: 5px;
`

const SectionTitle = styled.h1`
    font-size: 20px;
    padding: 10px;
`

const Game = styled.div`
    display: flex;
    flex-direction: row;
    margin: 5px;
    width: 350px;
`

const GameText = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
`

const Cover = styled.img`
    width: 100px;
    height: 125px;
    border: 2px solid var(--lightbackground);
    margin: 5px;

    &.inactiveImage {
        filter: grayscale(.9);
    }

    &:hover {
        color: var(--lighthover);
        border: 2px solid var(--lighthover);
        filter: grayscale(.7);
    }
`

const Title = styled.p`
    font-weight: bold;
    font-size: 18px;
    margin-top: auto;
    margin-bottom: 15px;
    padding: 5px;
`

const SessionTime = styled.p`
    font-size: 14px;
    padding: 5px;
`

const SessionDuration = styled.p`
    font-size: 14px;
    margin-bottom: auto;
    padding: 5px;
`

const CalendarButton = styled.button`
    background-color: var(--primaryblue);
    width: 95px;
    height: 37px;
    border-radius: 8px;
    border: none;
    color: var(--lighttext);
    margin-left: 100px;
    margin-top: 15px;
    cursor: pointer;

    &:hover {
        background-color: var(--primaryhover);
    }

    &:disabled {
        background-color: var(--darkhover);
        cursor: not-allowed;
    }
`

const Link = styled.a`
    color: var(--lighttext);
    &:hover {
        color: var(--lighthover);
    }
`


// **********************************************
// Export the component
// **********************************************
export default NextSessions;