// generic libraries
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom"

// **********************************************************
// Simple user profile menu drop down
// **********************************************************
const UserMenu = ({menuStatus}) => {
    const { logout } = useAuth0();

    // *****************
    // Main render
    // *****************
    if (menuStatus) {
        return (
            <Menu>
                <MiniBox><FormattedLink to="/profile" >Profile</FormattedLink></MiniBox>
                <LoginButton onClick={() => logout({ returnTo: window.location.origin })} >Logout</LoginButton>
            </Menu>
        );
    
    // Hides on trigger of state
    } else {
        return null;
    }
}

// **********************************************************
// Styled components
// **********************************************************
const Menu = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: var(--lightbackground);
    right: 10px;
    top: 80px;
    z-index: 2;
`

const MiniBox = styled.div`
    border-bottom: 1px lightgray solid;
    padding: 15px;
`


const FormattedLink = styled(Link)`
    padding: 5px;
    margin-bottom: 10px;
    color: var(--darktext);
    background-color: var(--lightbackground);

    &:hover {
        color: var(--darkhover);
    }
`

const LoginButton = styled.button`
    background-color: var(--primaryblue);
    width: 100px;
    height: 35px;
    margin-left: 15px;
    margin-right: 15px;
    border-radius: 8px;
    border: none;
    color: var(--lighttext);
    margin-top: 10px;
    margin-bottom: 10px;
    cursor: pointer;

    &:hover {
        background-color: var(--primaryhover);
    }
`
// **********************************************************
// Default export of component
// **********************************************************
export default UserMenu;