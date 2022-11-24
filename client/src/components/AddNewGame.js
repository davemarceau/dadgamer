import styled from "styled-components";
import { useContext, useEffect, useState } from "react";

const AddNewGame = () => {
    return (
        <Wrapper>
            <HeadWrapper>
                <PageTitle>Search for a new game</PageTitle>
            </HeadWrapper>
            <SearchHeader>
                <SearchTitle>Search here: </SearchTitle>
                <SearchBar />
                <SearchButton>here</SearchButton>
            </SearchHeader>
            
        </Wrapper>
    );
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
    margin-top: auto;
    margin-left: auto;

    &:hover {
        background-color: var(--primaryhover);
    }

    &:disabled {
        background-color: var(--darkhover);
    }
`

const SearchHeader = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px;
`

const SearchTitle = styled.p`
    margin: 8px;
`

const SearchBar = styled.input`
    max-width: 100%;
    border-radius: 8px;
    height: 30px;
    border: none;
    margin-top: auto;
    margin-bottom: auto;
    
`

const SearchButton = styled.button`
    background-color: var(--primaryblue);
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: none;
    color: var(--lighttext);
    position: relative;
    left: -30px;
    margin-top: auto;
    margin-bottom: auto;

    &:hover {
        background-color: var(--primaryhover);
    }
`

const Link = styled.a`
    padding: 5px;
    margin-bottom: 10px;
    color: var(--darktext);
    background-color: var(--lightbackground);

    &:hover {
        color: var(--darkhover);
    }
`

export default AddNewGame