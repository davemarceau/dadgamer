import { BsJoystick } from "react-icons/bs"
import styled, { keyframes } from "styled-components";

const Loading = () => {
    
    return (
        <Wrapper>
            <Joystick />
            <LoadingText>Loading...</LoadingText>
        </Wrapper>
    )
    
}

const pulse = keyframes`
    0% {  height: 75px; width: 75px; }
    50% {  height: 90px; width: 90px; }
    100% {  height: 75px; width: 75px; }
`

const textPulse = keyframes`
    0% {  font-size: 20px; }
    50% {  font-size: 25px; }
    100% {  font-size: 20px;; }
`


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 80vh;
`

const Joystick = styled(BsJoystick)`
    width: 75px;
    height: 75px;
    margin: 5px;
    margin-top: auto;
    margin-left: auto;
    margin-right: auto;
    color: var(--lighttext);
    animation: ${pulse} 0.5s linear infinite;
`

const LoadingText = styled.p`
    font-size: 20px;
    margin: 5px;
    color: var(--lighttext);
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
    animation: ${textPulse} 0.5s linear infinite;
`

export default Loading;