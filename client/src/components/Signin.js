// generic libraries
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

// **********************************************************
// Simple sign in welcome page when not logged in
// **********************************************************
const Signin = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Wrapper>
            <LoginBox>
                <Text>Please log in to use Dad Gamer</Text>
                <LoginButton onClick={() => loginWithRedirect()}>Log In</LoginButton>
            </LoginBox>
            
        </Wrapper>
    );
}

// **********************************************************
// Styled components
// **********************************************************
const Wrapper = styled.div`
    height: 80vh;
    width: 100vw;
    display: flex;
    background-color: var(--darkbackground);
`

const LoginBox = styled.div`
    width: 200px;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    border-radius: 10px;
    padding: 15px;
    margin: auto;
    flex-direction: column;
`

const Text = styled.p`
    margin-bottom: 15px;
    background-color: transparent;
    color: var(--darktext);
`

const LoginButton = styled.button`
    background-color: var(--primaryblue);
    width: 100px;
    height: 40px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 8px;
    border: none;
    color: var(--lighttext);

    &:hover {
        background-color: var(--primaryhover);
    }
`

// **********************************************************
// Default component export
// **********************************************************
export default Signin;