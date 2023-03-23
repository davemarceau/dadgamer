// generic libraries
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { useState, useContext } from "react";
import { BsJoystick } from "react-icons/bs"

// project specific components
import UserMenu from "./UserMenu";
import { UserDetailsContext } from "./contexts/UserDetailsContext";

// **********************************************************
// Site header component
// **********************************************************
const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { details } = useContext(UserDetailsContext);

    // Opens/closes the profile dropdown menu on profile icon click
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    // **************************
    // Main component render
    // **************************
    if (details) {
        let headerTitle = "";

        switch (details.gender) {
            case "Male": {
                headerTitle = "DadGamer";
                break;
            }
            case "Female": {
                headerTitle = "MomGamer";
                break;
            }
            default: {
                headerTitle = "ParentGamer";
            }
        }
        
        return (
            <HeaderWrapper>
                <SiteLogo href="/" ><LogoDiv><Joystick /><SiteTitle>{headerTitle}</SiteTitle></LogoDiv></SiteLogo>
                <InvisibleButton onClick={toggleMenu} ><ProfileIcon /></InvisibleButton>
                <UserMenu menuStatus={menuOpen} menuStatusUpdate={setMenuOpen} />
            </HeaderWrapper>
        );

    // Won't display the profile options if not logged in (can also take a second to show on load)
    } else {
        return (
            <HeaderWrapper>
                <SiteLogo href="/" ><LogoDiv><Joystick /><SiteTitle>ParentGamer</SiteTitle></LogoDiv></SiteLogo>
            </HeaderWrapper>
        );
    }
}

// **********************************************************
// Styled components
// **********************************************************
const HeaderWrapper = styled.div`
    background-color: var(--primaryblue);
    width: 100vw;
    height: 80px;
    display: flex;
    padding: 15px;
    border-bottom: 1px solid var(--lighttext);
`;

const SiteLogo = styled.a`
    color: var(--lighttext);
    &:hover {
        color: var(--lighthover);
    }
`

const LogoDiv = styled.div`
    display: flex;
    flex-direction: row;
`

const Joystick = styled(BsJoystick)`
    width: 50px;
    height: 50px;
    margin: 5px;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 10px;
`

const SiteTitle = styled.p`
    margin-top: auto;
    margin-bottom: auto;
    font-size: 30px;
    background-color: var(--primaryblue);
    font-weight: bold;
`

const ProfileIcon = styled(FaUserCircle)`
    width: 40px;
    height: 40px;
    color: var(--lighttext);
    cursor: pointer;

    &:hover {
        color: var(--lighthover);
    }
`

const InvisibleButton = styled.button`
    border: none;
    background-color: transparent;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 40px;
    margin-left: auto;
`

// **********************************************************
// Default export of component
// **********************************************************
export default Header;