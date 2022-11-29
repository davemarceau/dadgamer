import styled from "styled-components";
import { useContext, useEffect, useState } from "react";

import { UserCollectionContext } from "./UserCollectionContext";
import { UserDetailsContext } from "./UserDetailsContext";
import AddToCalendar from "./AddToCalendar";

const Calendar = () => {
    const { collection } = useContext(UserCollectionContext);
    const { details } = useContext(UserDetailsContext);
    const [days, setDays] = useState([[],[],[],[],[],[],[]])
    const [addingGame, setAddingGame] = useState(false);
    const [whereToAdd, setWhereToAdd] = useState(0);
    const [timeToAdd, setTimeToAdd] = useState(0);
    const [gameToAdd, setGameToAdd] = useState(null);

    useEffect(() => {
        setDays([[collection.games[0], collection.games[1]],[],[],[collection.games[0], collection.games[1]],[collection.games[1]],[],[]])
    }, [collection]);

    // Add a game to the week
    const handleAddGame = (game) => {
        /*if (!day0.includes(game)) {
            day0.push(game);
        }*/
        console.log("modal here");
        setGameToAdd(game);
        console.log(game);
        setAddingGame(true);
    }

    // Remove a game from a day
    const handleRemoveGame = (day, game) => {
        let updatedGames = [...days];
    
        updatedGames[day].splice(game, 1);

        setDays([...updatedGames]);
        console.log(days)
    }

    if (details && days.length > 0 && collection.hasLoaded) {
        return (
            <Wrapper>
                <WeekPicker>
                    <PreviousNext>{"<<"}</PreviousNext>
                    Week dropdown here
                    <PreviousNext>{">>"}</PreviousNext>
                </WeekPicker>
                <Week>
                    {days.map((day, i) => {
                        return (
                            <Day key={day + i} >
                                {days[i].map((game, j) => {
                                    return (
                                        <Game onClick={() => handleRemoveGame (i, j)} key={i + "_" + j} >
                                            
                                            <Cover src={game.cover} />
                                            <GameText>
                                                <Title>{game.name}</Title>
                                                <SessionHours>3h</SessionHours>
                                            </GameText>
                                        </Game>
                                    )
                                })}
                                <AvailableTime>Total available time: {details.availability[i]}h</AvailableTime>
                                <TimeLeft>Time left available: {0}h</TimeLeft>
                            </Day>
                        )
                    })}
                </Week>
                <Collection>
                    {collection.games.map((game) => {
                        if (game.active) {
                            return (
                                <Game onClick={() => handleAddGame(game)} >
                                    <Cover src={game.cover} />
                                    <Title>{game.name}</Title>
                                </Game>
                            )
                        }
                    })}
                    
                </Collection>
                <AddToCalendar addingGame={addingGame} setAddingGame={setAddingGame} whereToAdd={whereToAdd} setWhereToAdd={setWhereToAdd} timeToAdd={timeToAdd} setTimeToAdd={setTimeToAdd} gameToAdd={gameToAdd} setGameToAdd={setGameToAdd} />
            </Wrapper>
        );
    } else {
        return (
            "Loading..."
        );
    };
    
};

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

export default Calendar;