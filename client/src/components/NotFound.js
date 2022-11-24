import { BiErrorAlt } from "react-icons/bi";
import styled from "styled-components";


const NotFound = () => {
    return (
        <Wrapper>
            <ErrorIcon />
            <ErrorText>404! We have a lost gamer!</ErrorText>
            <a href="/" ><ReturnHome>Go back home here!</ReturnHome></a>
        </Wrapper>
        
    );
}

const Wrapper = styled.div`
    background-color: var(--darkbackground);
    color: var(--lighttext);
    display: flex;
    flex-direction: column;
    text-align: center;
`

const ErrorIcon = styled(BiErrorAlt)`
    width: 150px;
    height: 150px;
    color: red;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    margin-bottom: 30px;
`

const ErrorText = styled.p`
    color: var(--lighttext);
    margin: 20px;
    
`

const ReturnHome = styled.button`
    background-color: transparent;
    color: var(--lighttext);
    border: 1px solid var(--lighttext);
    padding: 5px;
    margin: 10px;

    &:hover {
        border: 1px solid var(--lighthover);
        color: var(--lighthover);
    }
`

export default NotFound;