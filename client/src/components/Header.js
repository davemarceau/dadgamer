import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

import UserMenu from "./UserMenu";


const Header = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    if (isAuthenticated) {
        return (
            <HeaderWrapper>
                <SiteTitle href="/" >DadGamer</SiteTitle>
                <InvisibleButton onClick={toggleMenu} ><ProfileIcon /></InvisibleButton>
                <UserMenu menuStatus={menuOpen} />
            </HeaderWrapper>
        );
    } else {
        return (
            <HeaderWrapper>
                <SiteTitle href="/" >DadGamer</SiteTitle>
            </HeaderWrapper>
        );
    }
}

const HeaderWrapper = styled.div`
    background-color: var(--primaryblue);
    width: 100vw;
    height: 80px;
    display: flex;
    padding: 15px;
`;

const SiteTitle = styled.a`
    color: var(--lighttext);
    margin-top: auto;
    margin-bottom: auto;
    font-size: 30px;
    background-color: var(--primaryblue);
    font-weight: bold;
    &:hover {
        color: var(--lighthover);
    }
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

export default Header;