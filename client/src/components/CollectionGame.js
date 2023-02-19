// generic libraries
import styled from "styled-components";
import { useContext, useState } from "react";

// project specific components
import { UserCollectionContext } from "./contexts/UserCollectionContext";
import { UserDetailsContext } from "./contexts/UserDetailsContext";
import { UserCalendarContext } from "./contexts/UserCalendarContext";
import Loading from "./Loading";
import RemoveFromCollection from "./RemoveFromCollection";

// generates today's date in a usable format compared to the DB
const todaysDate = Math.floor(Date.now() / 1000 / 60 / 60 / 24) * 1000 * 60 * 60 * 24;

// **********************************************************
// Collection game component
// **********************************************************
const CollectionGame = ({ game }) => {
    const { actions: { removeGame, updateGame } } = useContext(UserCollectionContext);
    let { id, name, cover, platforms, releaseDate, summary, timeToBeat, active, evergreen, url } = game;
    const { details } = useContext(UserDetailsContext);
    const [editMode, setEditMode] = useState(false);
    const [timeToBeatState, setTimeToBeatState] = useState(timeToBeat);
    const [activeState, setActiveState] = useState(active);
    const [evergreenState, setEvergreenState] = useState(evergreen);
    const { calendar, actions: { removeGameFromCollection } } = useContext(UserCalendarContext);
    const [deleteGame, setDeleteGame] = useState(false);
    
    // Calculates the time played so far for that game
    const sessionsSoFar = calendar.sessions.filter((session) => session.game.id === id && session.date <= todaysDate);
    let totalPlayedSoFar = 0;
    sessionsSoFar.forEach(session => {
        totalPlayedSoFar = totalPlayedSoFar + Number(session.duration);
    });
    
    // Calculates the time in the already planned sessions
    const futureSessions = calendar.sessions.filter((session) => session.game.id === id && session.date > todaysDate);
    let futurePlay = 0;
    futureSessions.forEach(session => {
        futurePlay = futurePlay + Number(session.duration);
    });
    
    // Calculates if there is any time left unnalocated compared to the time to beat
    const timeLeftUnallocated = timeToBeat - totalPlayedSoFar - futurePlay;

    // Delete game from collection and calendar
    const deleteGameConfirmed = () => {

        // From calendar
        removeGameFromCollection({ user: details._id, game: game })

        // From collection
        removeGame({ user: details._id, game: game });

        // Close the modal
        setDeleteGame(false);
    }

    // Opens dialog to confirm deletion on click
    const handleClickRemoveGame = () => {
        setDeleteGame(!deleteGame);
    }
    
    // Triggers either saving or edit mode on button click
    const handleEditMode = () => {
        // If in edit mode, attempt saving the changes
        if (editMode === true) {
            setEditMode("inProgress");
            game = {...game, timeToBeat: timeToBeatState, active: activeState, evergreen: evergreenState};
            updateGame({ user: details._id, game: game });
            setEditMode(false);

        // If not in edit mode, enable editing
        } else {
            setEditMode(true);
        }
    }

    // Updates the time to beat field
    const handleTimeToBeatChange = (e) => {
        setTimeToBeatState(e.target.value);
    }

    // Updates the Active status of the game
    const handleActiveChange = (e) => {
        setActiveState(!activeState);
    }

    // Updates the Evergreen status of the game
    const handleEvergreenChange = (e) => {
        setEvergreenState(!evergreenState);
    }



    // Fields at the bottom are editable depending on he editMode status
    const editSection = () => {
        switch (editMode) {
            case true:
                return (
                    <PlayPlanning>
                        <PlanDetails>
                            <PlanDetail><FieldTitle>Time to beat: </FieldTitle><TimeToBeatInput id="timetobeat" name="timetobeat" type="number" min="0" placeholder="hrs" value={timeToBeatState} onChange={handleTimeToBeatChange} /></PlanDetail>
                            <PlanDetail><FieldTitle>Active: </FieldTitle>{activeState ? <input type="checkbox" id="active" name="active" checked onChange={handleActiveChange} /> : <input type="checkbox" id="active" name="active" onChange={handleActiveChange} />}</PlanDetail>
                            <PlanDetail><FieldTitle>Evergreen title: </FieldTitle>{evergreenState ? <input type="checkbox" id="evergreen" name="evergreen" checked onChange={handleEvergreenChange} /> : <input type="checkbox" id="evergreen" name="evergreen" onChange={handleEvergreenChange} />}</PlanDetail>
                            <PlanDetail><FieldTitle>Time played so far: </FieldTitle>{totalPlayedSoFar}h</PlanDetail>
                            <PlanDetail><FieldTitle>Time in comming sessions: </FieldTitle>{futurePlay}h</PlanDetail>
                            <PlanDetail><FieldTitle>Time left unallocated: </FieldTitle>{evergreenState ? "Unlimited" : timeLeftUnallocated + "h"}</PlanDetail>
                        </PlanDetails>
                        <RemoveFromCollectionButton disabled >Remove from collection</RemoveFromCollectionButton>
                        <EditMode onClick={handleEditMode} >Save changes</EditMode>
                    </PlayPlanning>
                );
            case false:
                return (
                    <PlayPlanning>
                        <PlanDetails>
                            <PlanDetail><FieldTitle>Time to beat: </FieldTitle>{timeToBeat}</PlanDetail>
                            <PlanDetail><FieldTitle>Active: </FieldTitle>{active ? "Yes" : "No"}</PlanDetail>
                            <PlanDetail><FieldTitle>Evergreen title: </FieldTitle>{evergreen ? "Yes" : "No"}</PlanDetail>
                            <PlanDetail><FieldTitle>Time played so far: </FieldTitle>{totalPlayedSoFar}h</PlanDetail>
                            <PlanDetail><FieldTitle>Time in comming sessions: </FieldTitle>{futurePlay}h</PlanDetail>
                            <PlanDetail><FieldTitle>Time left unallocated: </FieldTitle>{evergreenState ? "Unlimited" : timeLeftUnallocated + "h"}</PlanDetail>
                        </PlanDetails>
                        <RemoveFromCollectionButton onClick={handleClickRemoveGame} >Remove from collection</RemoveFromCollectionButton>
                        <EditMode onClick={handleEditMode} >Edit details</EditMode>
                    </PlayPlanning>
                );
            case "inProgress":
                return (
                    <PlayPlanning>
                        <PlanDetails>
                            <PlanDetail><FieldTitle>Time to beat: </FieldTitle>{timeToBeat}</PlanDetail>
                            <PlanDetail><FieldTitle>Active: </FieldTitle>{active ? "Yes" : "No"}</PlanDetail>
                            <PlanDetail><FieldTitle>Evergreen title: </FieldTitle>{evergreen ? "Yes" : "No"}</PlanDetail>
                            <PlanDetail><FieldTitle>Time played so far: </FieldTitle>{totalPlayedSoFar}h</PlanDetail>
                            <PlanDetail><FieldTitle>Time in comming sessions: </FieldTitle>{futurePlay}h</PlanDetail>
                            <PlanDetail><FieldTitle>Time left unallocated: </FieldTitle>{evergreenState ? "Unlimited" : timeLeftUnallocated + "h"}</PlanDetail>
                        </PlanDetails>
                        <RemoveFromCollectionButton disabled >Remove from collection</RemoveFromCollectionButton>
                        <EditMode disabled >In progress</EditMode>
                    </PlayPlanning>
                );
        }
    }

    // ********************
    // Main render of the component
    // ********************
    if (game) {
        return (
            <Wrapper>
                <MainInfo>
                    <Link href={url} target="_blank" ><CoverArt src={cover} alt="cover" className={active ? "activeImage" : "inactiveImage"} /></Link>
                    <Details>
                        <Link href={url} target="_blank" ><GameTitle>{name}</GameTitle></Link>
                        <SmallerDetails>
                            <ReleaseDate>Release dates: {releaseDate}</ReleaseDate>
                            <Platforms>Platforms: {platforms}</Platforms>
                        </SmallerDetails>
                    </Details>
                    
                </MainInfo>
                <Summary><FieldTitle>Summary: </FieldTitle>{summary}</Summary>
                {editSection()}
                <RemoveFromCollection deleteGame={deleteGame} setDeleteGame={() => setDeleteGame(!deleteGame)} game={game} deleteGameConfirmed={deleteGameConfirmed} totalPlayedSoFar={totalPlayedSoFar} />
            </Wrapper>
        );
    
    // loading if data not ready
    } else {
        return <Loading />
    }
}

// **********************************************************
// Styled components
// **********************************************************
const Wrapper = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    width: 600px;
    margin-left: auto;
    margin-right: auto;
    border-bottom: 1px solid var(--darkhover);
`;

const MainInfo = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: row;
    margin-left: auto;
    margin-right: auto;
`

const CoverArt = styled.img`
    height: 125px;
    width: 100px;
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

const Details = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
    width: 400px;
`

const GameTitle = styled.h2`
    font-size: 20px;
    font-weight: bold;
    margin: 5px;
`

const Link = styled.a`
    color: var(--lighttext);
    margin-top: auto;
    margin-bottom: auto;
    &:hover {
        color: var(--lighthover);
    }
`

const SmallerDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const ReleaseDate = styled.div`
    font-size: 14px;
    padding: 4px;
    width: 250px;
`

const Platforms = styled.div`
    font-size: 14px;
    padding: 4px;
`

const EditMode = styled.button`
    background-color: var(--primaryblue);
    width: 95px;
    height: 30px;
    border-radius: 8px;
    border: none;
    color: var(--lighttext);
    margin-top: auto;
    margin-bottom: auto;
    cursor: pointer;

    &:hover {
        background-color: var(--primaryhover);
    }

    &:disabled {
        background-color: var(--darkhover);
        cursor: not-allowed;
    }
`

const Summary = styled.div`
    font-size: 14px;
`

const FieldTitle = styled.span`
    font-weight: bold;
    margin-right: 3px;
`

const PlayPlanning = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px;
    font-size: 14px;
    
`

const PlanDetail = styled.div`
    display: flex;
    flex-direction: row;
    padding: 3px;
    margin-top: auto;
    margin-bottom: auto;
`

const RemoveFromCollectionButton = styled.button`
    color: var(--primaryblue);
    width: 80px;
    background-color: transparent;
    border: none;
    margin-top: auto;
    margin-bottom: auto;
    cursor: pointer;

    &:hover {
        color: var(--primaryhover);
    }

    &:disabled {
        color: var(--darkhover);
        cursor: not-allowed;
    }
`

const TimeToBeatInput = styled.input`
    width: 35px;
`

const PlanDetails = styled.div`
    width: 350px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

// **********************************************************
// Export the component
// **********************************************************
export default CollectionGame;