import styled from "styled-components";
import { useContext, useEffect, useState } from "react";

import { UserCollectionContext } from "./UserCollectionContext";
import { UserDetailsContext } from "./UserDetailsContext";

// **********************************************************
// Collection game component
// **********************************************************
const CollectionGame = ({ game }) => {
    const { actions: { removeGame } } = useContext(UserCollectionContext);
    const { id, name, cover, platforms, releaseDate, summary, timeToBeat, active, evergreen, url } = game;
    const { details } = useContext(UserDetailsContext);
    const [editMode, setEditMode] = useState(false);
    
    // Removes the game from the collection on the click of the button
    const handleClickRemoveGame = () => {
        removeGame({ user: details._id, game: game });
    }
    
    // Triggers either saving or edit mode on button click
    const handleEditMode = () => {
        // If in edit mode, attempt saving the changes
        if (editMode === true) {
            setEditMode("inProgress");
            fetch("/updateplannedgametime" + details._id, {
				method: "PATCH",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
                body: JSON.stringify({ user: details._id, game: game })
			})
				// remove later	
				.then((data) => data.json())
				.then((data) => {
                    setEditMode(false);
				})
				.catch((error) => {
					console.error("Error:", error);
				})
        
        // If not in edit mode, enable editing
        } else {
            setEditMode(true);
        }
    }

    const editSection = () => {
        switch (editMode) {
            case true:
                return (
                    <PlayPlanning>
                        <PlanDetail><FieldTitle>Time to beat: </FieldTitle>{timeToBeat}</PlanDetail>
                        <PlanDetail><FieldTitle>Active: </FieldTitle>{active ? "Yes" : "No"}</PlanDetail>
                        <PlanDetail><FieldTitle>Evergreen title: </FieldTitle>{evergreen ? "Yes" : "No"}</PlanDetail>
                        <RemoveFromCollectionButton onClick={handleClickRemoveGame} >Remove from collection</RemoveFromCollectionButton>
                        <EditMode onClick={handleEditMode} >Save changes</EditMode>
                    </PlayPlanning>
                );
            case false:
                return (
                    <PlayPlanning>
                        <PlanDetail><FieldTitle>Time to beat: </FieldTitle>{timeToBeat}</PlanDetail>
                        <PlanDetail><FieldTitle>Active: </FieldTitle>{active ? "Yes" : "No"}</PlanDetail>
                        <PlanDetail><FieldTitle>Evergreen title: </FieldTitle>{evergreen ? "Yes" : "No"}</PlanDetail>
                        <RemoveFromCollectionButton onClick={handleClickRemoveGame} >Remove from collection</RemoveFromCollectionButton>
                        <EditMode onClick={handleEditMode} >Edit details</EditMode>
                    </PlayPlanning>
                );
            case "inProgress":
                return (
                    <PlayPlanning>
                        <PlanDetail><FieldTitle>Time to beat: </FieldTitle>{timeToBeat}</PlanDetail>
                        <PlanDetail><FieldTitle>Active: </FieldTitle>{active ? "Yes" : "No"}</PlanDetail>
                        <PlanDetail><FieldTitle>Evergreen title: </FieldTitle>{evergreen ? "Yes" : "No"}</PlanDetail>
                        <RemoveFromCollectionButton onClick={handleClickRemoveGame} >Remove from collection</RemoveFromCollectionButton>
                        <EditMode onClick={handleEditMode} >In progress</EditMode>
                    </PlayPlanning>
                );
        }
    }

    if (game) {
        return (
            <Wrapper>
                <MainInfo>
                    <Link href={url} target="_blank" ><CoverArt src={cover} alt="cover" /></Link>
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
            </Wrapper>
        );
    } else {
        return "Loading..."
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

    &:hover {
        color: var(--lighthover);
        border: 2px solid var(--lighthover);
        filter: grayscale(.7)
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


// **********************************************************
// Export the component
// **********************************************************
export default CollectionGame;