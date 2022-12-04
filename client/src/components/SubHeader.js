// generic libraries
import styled from "styled-components";

// **********************************************************
// Subheader menu for simple navigation
// **********************************************************
const SubHeader = () => {
    return (
        <Wrapper>
            <Link href="/" >Homepage</Link>
            <Link href="/calendar">Calendar</Link>
            <Link href="/collection" >Collection</Link>
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

const Link = styled.a`
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