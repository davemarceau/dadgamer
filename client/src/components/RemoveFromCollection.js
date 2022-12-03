import { Dialog } from '@mui/material';
import styled from "styled-components";

// **********************************************************
// Remove game from Collection
// **********************************************************
const RemoveFromCollection = ({ deleteGame, setDeleteGame, game, deleteGameConfirmed, totalPlayedSoFar }) => {

    return (
        <Dialog open={deleteGame} onClose={setDeleteGame}>
            <FormattedDialog>
                <PopupTitle>Are you sure you want to delete this game from your collection and all associated sessions?</PopupTitle>
                <GameDetails>
                    <Cover src={game.cover}/>
                    <GameTitle>{game.name}</GameTitle>
                </GameDetails>
                <AddDetail>
                    <FieldTitle>Time played so far (in hours): {totalPlayedSoFar}</FieldTitle>
                </AddDetail>
                <Buttons>
                    <RemoveFromCollectionButton onClick={deleteGameConfirmed} >Delete</RemoveFromCollectionButton>
                    <CancelButton onClick={setDeleteGame} >Cancel</CancelButton>
                </Buttons>
            </FormattedDialog>
        </Dialog>
    )
}

const FormattedDialog = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: var(--darkbackground);
    color: var(--lighttext);
    border: 2px solid var(--lighttext);
    width: 350px;
    align-items: center;
`

const PopupTitle = styled.h1`
    margin: 5px;
    font-size: 20px;
    margin-left: auto;
    margin-right: auto;
`

const GameDetails = styled.div`
    display: flex;
    flex-direction: row;
    padding: 5px;
    margin-left: auto;
    margin-right: auto;
    width: 300px;
`

const Cover = styled.img`
    height: 65px;
    width: 50px;
    border: 2px solid var(--lightbackground);
    margin: 5px;
`

const GameTitle = styled.h2`
    font-size: 15px;
    font-weight: bold;
    margin: 5px;
    margin-top: auto;
    margin-bottom: auto;
`

const AddDetail = styled.div`
    display: flex;
    flex-direction: row;
    padding: 3px;
    margin-top: auto;
    margin-bottom: auto;
`

const FieldTitle = styled.span`
    font-weight: bold;
    margin-right: 3px;
`

const RemoveFromCollectionButton = styled.button`
    background-color: #8c0303;
    width: 80px;
    height: 40px;
    border-radius: 8px;
    border: none;
    color: var(--lighttext);
    margin: 0px 40px;
    cursor: pointer;

    &:hover {
        background-color: #872d2d;
    }

    &:disabled {
        background-color: var(--darkhover);
        cursor: not-allowed;
    }
`

const CancelButton = styled.button`
    background-color: var(--primaryblue);
    width: 80px;
    height: 40px;
    border-radius: 8px;
    border: none;
    color: var(--lighttext);
    margin: 0px 40px;
    cursor: pointer;

    &:hover {
        background-color: var(--primaryhover);
    }

    &:disabled {
        background-color: var(--darkhover);
        cursor: not-allowed;
    }
`

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px;
`

export default RemoveFromCollection;