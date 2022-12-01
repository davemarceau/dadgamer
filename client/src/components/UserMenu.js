import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const UserMenu = ({menuStatus}) => {
    const { logout } = useAuth0();

    if (menuStatus) {
        return (
            <Menu>
                <MiniBox><Link href="/profile" >Profile</Link></MiniBox>
                <LoginButton onClick={() => logout({ returnTo: window.location.origin })} >Logout</LoginButton>
            </Menu>
        );
    } else {
        return null;
    }
}

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


const Link = styled.a`
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


export default UserMenu;