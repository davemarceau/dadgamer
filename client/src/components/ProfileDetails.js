import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { Auth0Context } from "@auth0/auth0-react";

import { UserDetailsContext } from "./UserDetailsContext";
import Loading from "./Loading";

const ProfileDetails = ({ editMode }) => {
    const { details } = useContext(UserDetailsContext);
    const { user } = useContext(Auth0Context);
    
    // Checks if details are loaded to prevent crash
    if (details) {
        return (
            <Wrapper>
                <Details>
                    <SectionTitle>Profile details</SectionTitle>
                    <Detail><FieldTitle>First Name: </FieldTitle>{details.firstName ? details.firstName : "N/A"}</Detail>
                    <Detail><FieldTitle>Last Name: </FieldTitle>{details.lastName ? details.lastName : "N/A"}</Detail>
                    <Detail><FieldTitle>Email: </FieldTitle>{user.email}</Detail>
                    <Detail><FieldTitle>Gender: </FieldTitle>{details.gender ? details.gender : "N/A"}</Detail>
                </Details>
                <Availability>
                    <SectionTitle>Availability for each day (in hours)</SectionTitle>
                    <Detail><FieldTitle>Sunday: </FieldTitle>{details.availability[0] ? details.availability[0] + "h" : "None"}</Detail>
                    <Detail><FieldTitle>Monday: </FieldTitle>{details.availability[1] ? details.availability[1] + "h" : "None"}</Detail>
                    <Detail><FieldTitle>Tuesday: </FieldTitle>{details.availability[2] ? details.availability[2] + "h" : "None"}</Detail>
                    <Detail><FieldTitle>Wednesday: </FieldTitle>{details.availability[3] ? details.availability[3] + "h" : "None"}</Detail>
                    <Detail><FieldTitle>Thusrday: </FieldTitle>{details.availability[4] ? details.availability[4] + "h" : "None"}</Detail>
                    <Detail><FieldTitle>Friday: </FieldTitle>{details.availability[5] ? details.availability[5] + "h" : "None"}</Detail>
                    <Detail><FieldTitle>Saturday: </FieldTitle>{details.availability[6] ? details.availability[6] + "h" : "None"}</Detail>
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

export default ProfileDetails;