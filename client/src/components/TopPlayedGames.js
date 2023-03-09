// generic libraries
import styled from "styled-components";
import { useContext } from "react";
import { Link } from "react-router-dom"

// project specific components
import { UserCalendarContext } from "./contexts/UserCalendarContext";
import { UserCollectionContext } from "./contexts/UserCollectionContext";
import Loading from "./Loading";
//import { useState } from "react";
//import { useEffect } from "react";

// Generates today'S date in a format compatible with the db
const todaysDate = Math.floor(Date.now() / 1000 / 60 / 60 / 24) * 1000 * 60 * 60 * 24;

// **********************************************
// Finds the 3 most played games in your collection
// **********************************************
const TopPlayedGames = () => {
    const { calendar } = useContext(UserCalendarContext);
    const { collection } = useContext(UserCollectionContext);

        // identifies all past sessions
        const pastSessions = calendar.sessions.filter((session) => {
            return session.date < todaysDate;
        })

        // compile the duration of sessions played for each game in the collection 
        const eachGameCompiled = collection.games.map((game) => {
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


    // keep only the first 3
    const top3 = eachGameCompiled.slice(0, 3);

    // render only if calendar and collections are loaded
    if (calendar.hasLoaded && collection.hasLoaded) {
        return (
            <Wrapper>
                <SectionTitle>Your top 3 played games so far</SectionTitle>
                {top3.map((game) => {
                    return (
                        <Game key={game.id} >
                            <ExternalLink href={game.url} target="_blank" ><Cover src={game.cover} /></ExternalLink>
                            <GameText>
                            <ExternalLink href={game.url} target="_blank" ><Title>{game.name}</Title></ExternalLink>
                                <TotalTime>Total time played: {game.totalTimePlayed}h</TotalTime>
                            </GameText>
                        </Game>
                    )
                })}
                <FormattedLink to="/collection"><CollectionButton>See more in your collection</CollectionButton></FormattedLink>
            </Wrapper>
        )
    // otherwise display loading
    } else {
        return (
        <Wrapper>
            <SectionTitle>Your top 3 played games so far</SectionTitle>
            <Loading />
            <FormattedLink to="/collection"><CollectionButton>See more in your collection</CollectionButton></FormattedLink>
        </Wrapper>
        )
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
    padding-left: 10px;
    border-left: 1px solid var(--lighthover);
    width: 400px;
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

const TotalTime = styled.p`
    font-size: 14px;
    padding: 5px;
    margin-bottom: auto;
`

const CollectionButton = styled.button`
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

const FormattedLink = styled(Link)`
    color: var(--lighttext);
    &:hover {
        color: var(--lighthover);
    }
`

const ExternalLink = styled.a`
    color: var(--lighttext);
    &:hover {
        color: var(--lighthover);
    }
`

// **********************************************
// Export the component
// **********************************************
export default TopPlayedGames;