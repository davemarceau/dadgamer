// generic libraries
import styled from "styled-components";
import { useContext } from "react";
import { Link } from "react-router-dom"

// project specific components
import { UserCollectionContext } from "./contexts/UserCollectionContext";
import CollectionGame from "./CollectionGame";
import Loading from "./Loading";

// *****************************************************************
// Component rendering the collection list
// *****************************************************************
const Collection = () => {
    const { collection } = useContext(UserCollectionContext);

    if (collection.hasLoaded) {
        return (
            <Wrapper>
                <HeadWrapper>
                    <PageTitle>Your game collection</PageTitle>
                    <FormattedLink to="/addgame" ><AddGame>Add a game</AddGame></FormattedLink>
                </HeadWrapper>
                {
                    collection.games.map((game) => {
                        return <CollectionGame game={game} key={game.id} />
                    })
                }
            </Wrapper>
        );
    } else {
        return <Loading />
    }
}

// *****************************************************************
// Styled components
// *****************************************************************
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const HeadWrapper = styled.div`
    border-bottom: 1px solid var(--darkhover);
    margin-bottom: 20px;
    padding: 10px;
    display: flex;
    flex-direction: row;
`


const PageTitle = styled.h1`
    font-size: 30px;
`

const AddGame = styled.button`
    background-color: var(--primaryblue);
    width: 90px;
    height: 35px;
    border-radius: 8px;
    border: none;
    color: var(--lighttext);
    cursor: pointer;

    &:hover {
        background-color: var(--primaryhover);
    }

    &:disabled {
        background-color: var(--darkhover);
    }
`

/*const Link = styled.a`
    margin-top: auto;
    margin-left: auto;

    &:hover {
        color: var(--darkhover);
    }
`*/

const FormattedLink = styled(Link)`
    margin-top: auto;
    margin-left: auto;

    &:hover {
        color: var(--darkhover);
    }
`

const ExternalLink = styled.a`
    margin-top: auto;
    margin-left: auto;

    &:hover {
        color: var(--darkhover);
    }
`

// *****************************************************************
// Default export
// *****************************************************************
export default Collection;