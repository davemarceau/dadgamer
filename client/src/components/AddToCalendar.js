import { Dialog } from '@mui/material';
import styled from "styled-components";

const AddToCalendar = ({addingGame, setAddingGame, whereToAdd, setWhereToAdd, timeToAdd, setTimeToAdd, gameToAdd, setGameToAdd }) => {
    const displayModal = addingGame;

    if (gameToAdd && displayModal) {
        return (
            <Dialog open={displayModal} onClose={setAddingGame(false)}>
                <FormattedDialog>
                    <p>{gameToAdd.name}</p>
                    <p>Test</p>
                </FormattedDialog>
            </Dialog>
        )
    } else if (displayModal) {
        return (
            <Dialog open={displayModal} onClose={setAddingGame(false)}>
                <p>Loading...</p>
            </Dialog>
            
        )
    }
    
}

const FormattedDialog = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
    background-color: var(--darkbackground);
    color: var(--lighttext);
    border: 2px solid var(--lighttext);
`

export default AddToCalendar;