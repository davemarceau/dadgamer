import styled from "styled-components";
import { useContext, useState } from "react";

import { UserDetailsContext } from "./UserDetailsContext";
import ProfileDetails from "./ProfileDetails";
import ProfileDetailsEditing from "./ProfileDetailsEditing";
import noImage from "./assets/No-Image-Placeholder.png"
import Loading from "./Loading";

// ***********************************************
// Profile component here
// ***********************************************
const Profile = () => {
    const [editMode, setEditMode] = useState(false);
    const { details, setDetails } = useContext(UserDetailsContext);
    
    // Triggers either the saving of the info or enables the edit mode
    const handleEdit = () => {
        
        console.log(details.profileImage);
        // If in edit mode, attempt saving the changes
        if (editMode === true) {
            setEditMode("inProgress");

            fetch("/updateUserDetails/" + details._id, {
				method: "PATCH",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
                body: JSON.stringify(details)
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
    
    // Checks if details are loaded to prevent crash
    if (details) {
        // While not editing
        if (editMode === false) {
            return (
                <Wrapper>
                    <TopDiv>
                        <ProfileName>{details.preferredName ? details.preferredName : "Gamer tag TBD"}</ProfileName>
                        <EditButton onClick={handleEdit} >Edit</EditButton>
                    </TopDiv>
                    <ProfileDetails editMode={editMode} />
                </Wrapper>
            )
    
        // While editing
        } else if (editMode === true) {
            return (
                <Wrapper>
                    <TopDiv>
                        <Detail><FieldTitle>Gamer tag: </FieldTitle><DetailInput id="preferredName" placeholder="Enter gamer tag here" value={details.preferredName ? details.preferredName : ""} onChange={(e) => setDetails({...details, preferredName: e.target.value})} /></Detail>
                        <EditButton onClick={handleEdit} >Save</EditButton>
                    </TopDiv>
                    <ProfileDetailsEditing editMode={editMode} />
                </Wrapper>
            )
        } else {
            return (
                <Wrapper>
                    <TopDiv>
                        <ProfileName>{details.preferredName ? details.preferredName : "Gamer tag TBD"}</ProfileName>
                        <EditButton disabled >Updating...</EditButton>
                    </TopDiv>
                    <ProfileDetails editMode={editMode} />
                </Wrapper>
            )
        }
    } else {
        return <Loading />
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

    &:disabled {
        background-color: var(--darkhover);
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