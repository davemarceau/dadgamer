import { Dialog } from '@mui/material';
import styled from "styled-components";
import { useEffect } from "react";

// **********************************************************
// Add to calendar component
// **********************************************************
const EditRemoveInCalendar = ({editingGame, setEditingGame, sessionToEdit, setSessionToEdit, weekData, monthNames, weekDays, user, editSessionFromModal, removeSessionFromModal }) => {
    
    // updates the duration in hours of the session
    const handleSessionLengthChange = (e) => {
        setSessionToEdit({...sessionToEdit, duration: Number(e.target.value)});
    }

    // Updates the date of the session
    const handleSessionDateChange = (e) => {
        setSessionToEdit({...sessionToEdit, date: Number(e.target.value)});
    }

    // Generates the session record upon confirmation
    const handleConfirm = () => {
        editSessionFromModal({user: user, session: sessionToEdit})
        setSessionToEdit(null);
        setEditingGame();
    }

    const handleRemove = () => {
        removeSessionFromModal({user: user, session: sessionToEdit});
        setSessionToEdit(null);
        setEditingGame();
    };

    if (sessionToEdit) {
        return (
            <Dialog open={editingGame} onClose={setEditingGame}>
                <FormattedDialog>
                    <PopupTitle>Modifying a play session</PopupTitle>
                    <GameDetails>
                        <Cover src={sessionToEdit.game.cover}/>
                        <GameTitle>{sessionToEdit.game.name}</GameTitle>
                    </GameDetails>
                    <AddDetail>
                        <FieldTitle>Time of the session (in hours): </FieldTitle>
                        <SessionLengthInput id="sessionLength" name="sessionLength" type="number" placeholder="hrs" value={sessionToEdit.duration} onChange={handleSessionLengthChange} />
                    </AddDetail>
                    <AddDetail>
                        <FieldTitle>Date of play session: </FieldTitle>
                        <DatePicked id="datepicked" name="datepicked" type="number" placeholder="Choose a date" value={sessionToEdit.date} onChange={handleSessionDateChange} >
                            {weekData.map((day) => {
                                return (
                                    <option key={"add" + day._id} value={day._id}>{weekDays[day.weekDay]}, {day.monthDay} of {monthNames[day.month]}, {day.year}</option>
                                )
                            })}
                        </DatePicked>
                    </AddDetail>
                    <Buttons>
                        <AddToCalendarButton onClick={handleConfirm} >Confirm</AddToCalendarButton>
                        <RemoveFromCalendarButton onClick={handleRemove} >Remove session</RemoveFromCalendarButton>
                        <AddToCalendarButton onClick={setEditingGame} >Cancel</AddToCalendarButton>
                    </Buttons>
                </FormattedDialog>
            </Dialog>
        )
    } else {
        return (
            <Dialog open={editingGame} onClose={setEditingGame}>
                <FormattedDialog>
                    <p>Loading...</p>
                </FormattedDialog>
                
            </Dialog>
            
        )
    }
    
}

// **********************************************************
// Styled components
// **********************************************************
const FormattedDialog = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
    background-color: var(--darkbackground);
    color: var(--lighttext);
    border: 2px solid var(--lighttext);
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

const SessionLengthInput = styled.input`
    width: 35px;
`

const DatePicked = styled.select`
    
`

const AddToCalendarButton = styled.button`
    background-color: var(--primaryblue);
    width: 80px;
    height: 40px;
    border-radius: 8px;
    border: none;
    color: var(--lighttext);
    margin: auto;
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

const RemoveFromCalendarButton = styled.button`
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
// Component export
// **********************************************************
export default EditRemoveInCalendar;