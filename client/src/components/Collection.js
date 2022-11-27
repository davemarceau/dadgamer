import styled from "styled-components";
import { useContext, useEffect, useState } from "react";

import { UserCollectionContext } from "./UserCollectionContext";
import CollectionGame from "./CollectionGame";

const Collection = () => {
    const { collection } = useContext(UserCollectionContext);
    
    if (collection) {
        return (
            <Wrapper>
                <HeadWrapper>
                    <PageTitle>Your game collection</PageTitle>
                    <Link href="/addgame" ><AddGame>Add a game</AddGame></Link>
                </HeadWrapper>
                
                <CollectionGame game={collection[0]} />
                <CollectionGame game={collection[1]} />
            </Wrapper>
        );
    } else {
        return "Loading..."
    }
}

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

const Link = styled.a`
    margin-top: auto;
    margin-left: auto;

    &:hover {
        color: var(--darkhover);
    }
`

export default Collection;