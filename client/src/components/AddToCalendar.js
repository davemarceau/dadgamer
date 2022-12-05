// generic libraries
import { Dialog } from '@mui/material';
import styled from "styled-components";
import { useEffect } from "react";

// project specific components
import Loading from './Loading';

// **********************************************************
// Add to calendar component
// **********************************************************
const AddToCalendar = ({addingGame, setAddingGame, whereToAdd, setWhereToAdd, timeToAdd, setTimeToAdd, gameToAdd, weekData, monthNames, weekDays, user, addSessionFromModal }) => {

    // Loads a default value to avoid errors when submitting
    useEffect(() => {
        setWhereToAdd(weekData[0]._id);
    }, [weekData]);
    
    // updates the duration in hours of the session
    const handleSessionLengthChange = (e) => {
        setTimeToAdd(Number(e.target.value));
    }

    // Updates the date of the session
    const handleSessionDateChange = (e) => {
        setWhereToAdd(Number(e.target.value));
    }

    // Generates the session record upon confirmation
    const handleConfirm = () => {
        addSessionFromModal({user: user, session: {date: whereToAdd, game: gameToAdd, duration: timeToAdd}})
        setTimeToAdd(0);
        setAddingGame();
    }

    // ******************
    // Main component render
    // ******************
    if (gameToAdd) {
        return (
            <Dialog open={addingGame} onClose={setAddingGame}>
                <FormattedDialog>
                    <PopupTitle>Adding a play session</PopupTitle>
                    <GameDetails>
                        <Cover src={gameToAdd.cover}/>
                        <GameTitle>{gameToAdd.name}</GameTitle>
                    </GameDetails>
                    <AddDetail>
                        <FieldTitle>Time of the session (in hours): </FieldTitle>
                        <SessionLengthInput id="sessionLength" name="sessionLength" type="number" min="0" max="24" placeholder="hrs" value={timeToAdd} onChange={handleSessionLengthChange} />
                    </AddDetail>
                    <AddDetail>
                        <FieldTitle>Date of play session: </FieldTitle>
                        <DatePicked id="datepicked" name="datepicked" type="number" placeholder="Choose a date" value={whereToAdd} onChange={handleSessionDateChange} >
                            {weekData.map((day) => {
                                return (
                                    <option key={"add" + day._id} value={day._id}>{weekDays[day.weekDay]}, {day.monthDay} of {monthNames[day.month]}, {day.year}</option>
                                )
                            })}
                        </DatePicked>
                    </AddDetail>
                    <Buttons>
                        <AddToCalendarButton onClick={handleConfirm} >Confirm</AddToCalendarButton>
                        <AddToCalendarButton onClick={setAddingGame} >Cancel</AddToCalendarButton>
                    </Buttons>
                </FormattedDialog>
            </Dialog>
        )
        
    // loading of data is not ready
    } else {
        return (
            <Dialog open={addingGame} onClose={setAddingGame}>
                <FormattedDialog>
                    <Loading />
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

// **********************************************************
// Component export
// **********************************************************
export default AddToCalendar;