import styled from "styled-components";
import { useContext } from "react";
import { Auth0Context } from "@auth0/auth0-react";

import UploadImage from "./UploadImage";
import { UserDetailsContext } from "./UserDetailsContext";
import Loading from "./Loading";

const ProfileDetailsEditing = ({ editMode }) => {
    const { details, setDetails } = useContext(UserDetailsContext);
    const { user } = useContext(Auth0Context);

    const handleDetailChange = (e) => {
        switch (e.target.id) {
            case "firstName":
                setDetails({...details, firstName: e.target.value})
                break;
            case "lastName":
                setDetails({...details, lastName: e.target.value})
                break;
            case "gender":
                setDetails({...details, gender: e.target.value})
                break;
        }
    }

    const handleDayChange = (e) => {
        const tempAvailability = [...details.availability];
        tempAvailability[e.target.id] = e.target.value;
        setDetails({...details, availability: tempAvailability});
    }

    // Checks if details are loaded to prevent crash
    if (details) {
        return (
            <Wrapper>
                <Details>
                    <SectionTitle>Profile details</SectionTitle>
                    <Detail><FieldTitle>First Name: </FieldTitle><DetailInput id="firstName" placeholder="Enter first name here" value={details.firstName ? details.firstName : ""} onChange={handleDetailChange} /></Detail>
                    <Detail><FieldTitle>Last Name: </FieldTitle><DetailInput id="lastName" placeholder="Enter last name here" value={details.lastName ? details.lastName : ""} onChange={handleDetailChange} /></Detail>
                    <Detail><FieldTitle>Email: </FieldTitle>{user.email}</Detail>
                    <Detail>
                        <FieldTitle>Gender: </FieldTitle>
                        <GenderInput id="gender" placeholder="Enter gender here" value={details.gender ? details.gender : ""} onChange={handleDetailChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other/prefer not to say</option>
                        </GenderInput>
                    </Detail>
                </Details>
                <Availability>
                    <SectionTitle>Availability for each day (in hours)</SectionTitle>
                    <Detail><FieldTitle>Sunday: </FieldTitle><DayInput type="number" min="0" max="24" id="0" placeholder="Hours here" value={details.availability[0] ? details.availability[0] : ""} onChange={handleDayChange} /></Detail>
                    <Detail><FieldTitle>Monday: </FieldTitle><DayInput type="number" min="0" max="24" id="1" placeholder="Hours here" value={details.availability[1] ? details.availability[1] : ""} onChange={handleDayChange} /></Detail>
                    <Detail><FieldTitle>Tuesday: </FieldTitle><DayInput type="number" min="0" max="24" id="2" placeholder="Hours here" value={details.availability[2] ? details.availability[2] : ""} onChange={handleDayChange} /></Detail>
                    <Detail><FieldTitle>Wednesday: </FieldTitle><DayInput type="number" min="0" max="24" id="3" placeholder="Hours here" value={details.availability[3] ? details.availability[3] : ""} onChange={handleDayChange} /></Detail>
                    <Detail><FieldTitle>Thusrday: </FieldTitle><DayInput type="number" min="0" max="24" id="4" placeholder="Hours here" value={details.availability[4] ? details.availability[4] : ""} onChange={handleDayChange} /></Detail>
                    <Detail><FieldTitle>Friday: </FieldTitle><DayInput type="number" min="0" max="24" id="5" placeholder="Hours here" value={details.availability[5] ? details.availability[5] : ""} onChange={handleDayChange} /></Detail>
                    <Detail><FieldTitle>Saturday: </FieldTitle><DayInput type="number" min="0" max="24" id="6" placeholder="Hours here" value={details.availability[6] ? details.availability[6] : ""} onChange={handleDayChange} /></Detail>
                </Availability>
            </Wrapper>
        );
    } else {
        return <Loading />
    }
    
}

const Wrapper = styled.div`
    display: flex;
    padding: 5px;
    flex-direction: column;
`

const Details = styled.div`
    display: flex;
    padding: 15px;
    flex-direction: column;
    border-top: 1px solid var(--darkhover);
    border-bottom: 1px solid var(--darkhover);
    width: 450px;
`

const SectionTitle = styled.h1`
    font-size: 20px;
`

const Detail = styled.p`
    padding: 5px;
`

const FieldTitle = styled.span`
    font-weight: bold;
`

const Availability = styled.div`
    display: flex;
    padding: 15px;
    flex-direction: column;
`

const DetailInput = styled.input`
    width: 200px;
`

const GenderInput = styled.select`
    width: 170px;
`

const DayInput = styled.input`
    width: 67px;
`

const UploadButton = styled.input`
    
`

export default ProfileDetailsEditing;