// generic libraries
import styled from "styled-components";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

// project specific components
import NewGameSearchResult from "./NewGameSearchResult";

// **********************************************************
// Add new game component
// **********************************************************
const AddNewGame = () => {
    const [searchTerms, setSearchTerms] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);

    const handleSearchChange = (e) => {
        setSearchTerms(e.target.value);
    }

    // Reaches to the IGBD API through the backend to return search results
    const search = async () => {
        setSearching(true);
        fetch("/newgamesearch?searchString=" + searchTerms, {
            headers: {
                "Accept": "application/json",
            }
        })
            .then((data) => data.json())
            .then((data) => {
                if (data.status = 200) {
                    setSearchResults(data.data);
                    setSearching(false);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                setSearching(false);
            })
    }
    
    // Triggers the search on click
    const handleSearchClick = () => {
        search();
    }

    // Triggers the search on pressing enter
    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            search();
        }
    }

    // Renders the results depending on what is found. Called in the main render
    const giveResults = () => {
        if (searchResults.length > 0) {
            return (
                <>
                    {searchResults.map((result) => {
                        return <NewGameSearchResult key={result.id} name={result.name} cover={result.cover} id={result.id} platforms={result.platforms} url={result.url} rating={result.rating} releaseDate={result.first_release_date} summary={result.summary} />
                    })}
                </>
            )
        } else {
            return (
                "No results found"
            )
        }
    }
    
    // ************************
    // Main render of the component
    // ************************
    return (
        <Wrapper>
            <HeadWrapper>
                <PageTitle>Search for a new game</PageTitle>
            </HeadWrapper>
            <SearchHeader>
                <SearchTitle>Search here: </SearchTitle>
                <SearchBar value={searchTerms} placeholder="Game name here" onChange={handleSearchChange} onKeyDown={handleSearchKeyDown} />
                {searching
                    ? <SearchButton disabled ><FaSearch /></SearchButton>
                    : <SearchButton onClick={handleSearchClick} ><FaSearch /></SearchButton>
                }
                
            </SearchHeader>
            <ResultsSection>
                {searchResults ? giveResults() : ""}
            </ResultsSection>
        </Wrapper>
    );
}

// **********************************************************
// Styled components
// **********************************************************
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

const SearchHeader = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px;
    border-bottom: 1px solid var(--darkhover);
    padding-bottom: 25px;
`

const SearchTitle = styled.p`
    margin: 8px;
    margin-top: auto;
    margin-bottom: auto;
`

const SearchBar = styled.input`
    max-width: 100%;
    width: calc(100% - 150px);
    border-radius: 8px;
    height: 30px;
    border: none;
    margin-top: auto;
    margin-bottom: auto;
    padding: 5px;
`

const SearchButton = styled.button`
    background-color: var(--primaryblue);
    width: 37px;
    height: 37px;
    border-radius: 8px;
    border: none;
    color: var(--lighttext);
    position: relative;
    left: -39px;
    margin-top: auto;
    margin-bottom: auto;
    cursor: pointer;

    &:hover {
        background-color: var(--primaryhover);
    }

    &:disabled {
        background-color: var(--darkhover);
        cursor: wait;
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

const ResultsSection = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`

// **********************************************************
// Exporting component
// **********************************************************
export default AddNewGame