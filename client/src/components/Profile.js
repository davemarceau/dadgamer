import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { Auth0Context } from "@auth0/auth0-react";

import { UserDetailsContext } from "./UserDetailsContext";
import ProfileDetails from "./ProfileDetails";
import ProfileDetailsEditing from "./ProfileDetailsEditing";

const Profile = () => {
    const [editMode, setEditMode] = useState(false);
    const { details, setDetails } = useContext(UserDetailsContext);
    //const [tag, setTag] = useState(details.preferredName);
    
    const handleEdit = () => {
        setEditMode(!editMode);
    }
    
    // Checks if details are loaded to prevent crash
    if (details) {
        // While not editing
        if (!editMode) {
            return (
                <Wrapper>
                    <TopDiv>
                        <ProfileName>{details.preferredName ? details.preferredName : "Gamer tag TBD"}</ProfileName>
                        <EditButton onClick={handleEdit} >Edit</EditButton>
                        <ProfileImage src="niet" alt="Dev in progress" />
                    </TopDiv>
                    <ProfileDetails editMode={editMode} />
                </Wrapper>
            )
    
        // While editing
        } else {
            return (
                <Wrapper>
                    <TopDiv>
                        <Detail><FieldTitle>Gamer tag: </FieldTitle><DetailInput id="preferredName" placeholder="Enter gamer tag here" value={details.preferredName ? details.preferredName : ""} onChange={(e) => setDetails({...details, preferredName: e.target.value})} /></Detail>
                        <EditButton onClick={handleEdit} >Save</EditButton>
                        <ProfileImage src="niet" alt="Dev in progress" />
                    </TopDiv>
                    <ProfileDetailsEditing editMode={editMode} />
                </Wrapper>
            )
        }
    } else {
        return "Loading..."
    }
    

}

const Wrapper = styled.div`
    display: flex;
    padding: 25px;
    flex-direction: column;
`

const TopDiv = styled.div`
    display: flex;
    flex-direction: row;
    padding: 15px;
    height: 110px;
    width: 600px;
`

const ProfileName = styled.h1`
    font-size: 30px;
    margin-top: 45px;
`

const EditButton = styled.button`
    background-color: var(--primaryblue);
    width: 80px;
    height: 35px;
    border-radius: 8px;
    border: none;
    color: var(--lighttext);
    margin-top: auto;
    margin-left: auto;

    &:hover {
        background-color: var(--primaryhover);
    }
`

const ProfileImage = styled.img`
    width: 100px;
    height: 100px;
    border: 3px solid var(--lightbackground);
    margin-left: 25px;
    margin-right: 10px;
    display: inline-block;
`

const Detail = styled.p`
    padding: 5px;
`

const FieldTitle = styled.span`
    font-weight: bold;
    margin-top: 45px;
`

const DetailInput = styled.input`
    width: 200px;
    margin-top: 45px;
`




export default Profile;