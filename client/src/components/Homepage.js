import styled from "styled-components";

import NextSessions from "./NextSessions";
import TopPlayedGames from "./TopPlayedGames";

// **********************************************
// Finds the next 3 sessions to display on the homepage
// **********************************************
const Homepage = () => {
    return (
        <Wrapper>
            <NextSessions />
            <TopPlayedGames />
        </Wrapper>
        
    );
}

// **********************************************
// Styled components
// **********************************************
const Wrapper = styled.div`
    background-color: var(--darkbackground);
    color: var(--lighttext);
    height: 80vh;
    display: flex;
    flex-direction: row;
`

// **********************************************
// Export the component
// **********************************************
export default Homepage;