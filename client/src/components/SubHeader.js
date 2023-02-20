// generic libraries
import styled from "styled-components";
import { Link } from "react-router-dom"

// **********************************************************
// Subheader menu for simple navigation
// **********************************************************
const SubHeader = () => {
    return (
        <Wrapper>
            <FormattedLink to="/" >Homepage</FormattedLink>
            <FormattedLink to="/calendar">Calendar</FormattedLink>
            <FormattedLink to="/collection" >Collection</FormattedLink>
        </Wrapper>
    );
};

// **********************************************************
// Styled components
// **********************************************************
const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    background-color: var(--secondaryblue);
    height: 30px;
`

const FormattedLink = styled(Link)`
    margin: auto 20px;
    color: var(--lighttext);

    &:hover {
        color: var(--lighthover);
    }
`

// **********************************************************
// Default component export
// **********************************************************
export default SubHeader;