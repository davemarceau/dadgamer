import { BsJoystick } from "react-icons/bs"
import styled from "styled-components";

const Loading = () => {
    
    return (
        <Wrapper>
            <Joystick />
            <LoadingText>Loading...</LoadingText>
        </Wrapper>
    )
    
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    
`

const Joystick = styled(BsJoystick)`
    width: 75px;
    height: 75px;
    margin: 5px;
    color: var(--lighttext);
`

const LoadingText = styled.p`
    font-size: 20px;
    margin: 5px;
    color: var(--lighttext);
`

export default Loading;