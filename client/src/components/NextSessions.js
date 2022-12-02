import styled from "styled-components";
import { useContext, useEffect, useState } from "react";

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

    const upcomingSessions = calendar.sessions.filter((session) => {
        return session.date >= todaysDate;
    })

    upcomingSessions.sort((a, b) => a.date - b.date);

    const next3 = upcomingSessions.slice(0, 3);

    console.log(next3);

    if (calendar) {
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
                            <Cover src={session.game.cover} />
                            <GameText>
                                <Title>{session.game.name}</Title>
                                <SessionTime>{weekDays[weekDay]}, {monthDay} of {monthNames[month]}</SessionTime>
                                <SessionDuration>Duration: {session.duration}h</SessionDuration>
                            </GameText>
                        </Game>
                    )
                })}
            </Wrapper>
        )
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


// **********************************************
// Export the component
// **********************************************
export default NextSessions;