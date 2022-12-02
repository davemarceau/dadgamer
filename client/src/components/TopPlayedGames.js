import styled from "styled-components";
import { useContext, useEffect, useState } from "react";

import { UserCalendarContext } from "./UserCalendarContext";
import Loading from "./Loading";

const todaysDate = Math.floor(Date.now() / 1000 / 60 / 60 / 24) * 1000 * 60 * 60 * 24;

// **********************************************
// Finds the 3 most played games in your collection
// **********************************************
const TopPlayedGames = () => {
    const { calendar } = useContext(UserCalendarContext);

    const pastSessions = calendar.sessions.filter((session) => {
        return session.date < todaysDate;
    })

    if (calendar) {
        return (
            <Wrapper>
                <SectionTitle>Your top 3 played games</SectionTitle>
                {pastSessions.map((session) => {
                    
                    // must exclude the add or reduce availability!!!

                    return (
                        <Game key={session.game.id} >
                            <Cover src={session.game.cover} />
                            <GameText>
                                <Title>{session.game.name}</Title>
                                <TotalTime>Total time played: {0}h</TotalTime>
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

const TotalTime = styled.p`
    font-size: 14px;
    padding: 5px;
`


// **********************************************
// Export the component
// **********************************************
export default TopPlayedGames;