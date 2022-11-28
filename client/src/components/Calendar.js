import styled from "styled-components";
import { useContext, useEffect, useState } from "react";

import { UserCollectionContext } from "./UserCollectionContext";
import { UserDetailsContext } from "./UserDetailsContext";

const Calendar = () => {
    const { collection } = useContext(UserCollectionContext);
    const { details } = useContext(UserDetailsContext);
    const [day0, setDay0] = useState([collection[0]]);
    const [day1, setDay1] = useState([]);
    const [day2, setDay2] = useState([]);
    const [day3, setDay3] = useState([]);
    const [day4, setDay4] = useState([]);
    const [day5, setDay5] = useState([]);
    const [day6, setDay6] = useState([]);
    const [whereToAdd, setWhereToAdd] = useState(0);
    const [timeToAdd, setTimeToAdd] = useState(0);
    const [triggerAddGame, setTriggerAddGame] = useState(false);
    
    const handleAddGame = (day, game) => {
        if (!day0.includes(game)) {
            day0.push(game);
        }
    }

    const handleRemoveGame = (day, game) => {
        let updatedGames = [...day0];

        const gameToRemove = updatedGames.findIndex((game) => {
            return game.id === game.id;
        });
    
        updatedGames.splice(gameToRemove, 1);
        day0 = [...updatedGames]
    }

    return (
        <Wrapper>
            <Week>
                <Day key="0" >
                    {day0.map((game) => {
                        return (
                            <Game onClick={handleRemoveGame} id={game.id} >
                                <Cover src={game.cover} />
                                <Title>{game.name}</Title>
                            </Game>
                        )
                    })}
                    <AvailableTime>Total available time: {details.availability[0]}h</AvailableTime>
                    <TimeLeft>Time left available: {0}h</TimeLeft>
                </Day>
                <Day key="1" >
                    <AvailableTime>Total available time: {details.availability[1]}h</AvailableTime>
                    <TimeLeft>Time left available: {0}h</TimeLeft>
                </Day>
                <Day key="2" >
                    <AvailableTime>Total available time: {details.availability[2]}h</AvailableTime>
                    <TimeLeft>Time left available: {0}h</TimeLeft>
                </Day>
                <Day key="3" >
                    <AvailableTime>Total available time: {details.availability[3]}h</AvailableTime>
                    <TimeLeft>Time left available: {0}h</TimeLeft>
                </Day>
                <Day key="4" >
                    <AvailableTime>Total available time: {details.availability[4]}h</AvailableTime>
                    <TimeLeft>Time left available: {0}h</TimeLeft>
                </Day>
                <Day key="5" >
                    <AvailableTime>Total available time: {details.availability[5]}h</AvailableTime>
                    <TimeLeft>Time left available: {0}h</TimeLeft>
                </Day>
                <Day key="6" >
                    <AvailableTime>Total available time: {details.availability[6]}h</AvailableTime>
                    <TimeLeft>Time left available: {0}h</TimeLeft>
                </Day>
            </Week>
            <Collection>
                {collection.map((game) => {
                    if (game.active) {
                        return (
                            <Game onClick={handleAddGame} >
                                <Cover src={game.cover} />
                                <Title>{game.name}</Title>
                            </Game>
                        )
                    }
                })}
                
            </Collection>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const Week = styled.div`
    display: flex;
    flex-direction: row;
    /*border: 1px solid var(--lighttext);*/
`

const Day = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid var(--lighttext);
    /*min-height: 200px;*/
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
    margin-top: 100px;
    font-size: 11px;
    width: 175px;
`

const TimeLeft = styled.p`
    margin-top: 5px;
    font-size: 11px;
    width: 175px;
`

export default Calendar;