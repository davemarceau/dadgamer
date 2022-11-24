import styled from "styled-components";
import { useContext, useEffect, useState } from "react";

import { UserCollectionContext } from "./UserCollectionContext";

const CollectionGame = ({ game }) => {
    const { collection, actions: { addGame, removeGame } } = useContext(UserCollectionContext);
    
    if (collection) {
        return (
            <Wrapper>
                Game here
            </Wrapper>
        );
    } else {
        return "Loading..."
    }
    
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
`

const PageTitle = styled.h1`
    font-size: 30px;
`

export default CollectionGame;