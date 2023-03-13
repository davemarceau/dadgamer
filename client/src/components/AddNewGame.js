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
    const [includedPlatforms, setIncludedPlatforms] = useState([]);

    const handleSearchChange = (e) => {
        setSearchTerms(e.target.value);
    }

    // Reaches to the IGBD API through the backend to return search results
    const search = async () => {
        setSearching(true);
        let platforms = "";

        // checks if platforms are filtered and if they are, add it to the search
        if (includedPlatforms.length > 0) {
            includedPlatforms.forEach((platform) => {
                if (!platforms) {
                    platforms = "&searchPlatforms=" + platform;
                } else {
                    platforms = platforms + "," + platform;
                }
            })
        }

        // fetch the results
        fetch("/newgamesearch?searchString=" + searchTerms + platforms, {
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

    // Add or remove the platform from the filter list
    const togglePlatform = (e) => {
        let tempPlatforms = [...includedPlatforms];

        // if checked, adds it to the values array
        if (e.target.checked === true) {
            
            tempPlatforms.push(e.target.value);
            setIncludedPlatforms(tempPlatforms);

        // if unchecked removes it from the values array
        } else {
            const platformToRemove = tempPlatforms.findIndex((platform) => {
                return platform === e.target.value;
            });

            tempPlatforms.splice(platformToRemove, 1);
            setIncludedPlatforms(tempPlatforms);
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
            <Platforms>
                    <Platform><PlatformCheckBox type="checkbox" id="6" name="6" value="6" onClick={togglePlatform} ></PlatformCheckBox><PlatformLabel htmlfor="6">PC (MS Windows)</PlatformLabel></Platform>
                    <Platform><PlatformCheckBox type="checkbox" id="167" name="167" value="167" onClick={togglePlatform} ></PlatformCheckBox><PlatformLabel htmlfor="167">Playstation 5</PlatformLabel></Platform>
                    <Platform><PlatformCheckBox type="checkbox" id="48" name="48" value="48" onClick={togglePlatform} ></PlatformCheckBox><PlatformLabel htmlfor="48">Playstation 4</PlatformLabel></Platform>
                    <Platform><PlatformCheckBox type="checkbox" id="9" name="9" value="9" onClick={togglePlatform} ></PlatformCheckBox><PlatformLabel htmlfor="9">Playstation 3</PlatformLabel></Platform>
                    <Platform><PlatformCheckBox type="checkbox" id="8" name="8" value="8" onClick={togglePlatform} ></PlatformCheckBox><PlatformLabel htmlfor="8">Playstation 2</PlatformLabel></Platform>
                    <Platform><PlatformCheckBox type="checkbox" id="7" name="7" value="6" onClick={togglePlatform} ></PlatformCheckBox><PlatformLabel htmlfor="7">Playstation 1</PlatformLabel></Platform>
                    <Platform><PlatformCheckBox type="checkbox" id="169" name="169" value="169" onClick={togglePlatform} ></PlatformCheckBox><PlatformLabel htmlfor="169">Xbox Series (X,S)</PlatformLabel></Platform>
                    <Platform><PlatformCheckBox type="checkbox" id="49" name="49" value="49" onClick={togglePlatform} ></PlatformCheckBox><PlatformLabel htmlfor="49">Xbox One</PlatformLabel></Platform>
                    <Platform><PlatformCheckBox type="checkbox" id="12" name="12" value="12" onClick={togglePlatform} ></PlatformCheckBox><PlatformLabel htmlfor="12">Xbox 360</PlatformLabel></Platform>
                    <Platform><PlatformCheckBox type="checkbox" id="11" name="11" value="11" onClick={togglePlatform} ></PlatformCheckBox><PlatformLabel htmlfor="11">Xbox</PlatformLabel></Platform>
                    <Platform><PlatformCheckBox type="checkbox" id="130" name="130" value="130" onClick={togglePlatform} ></PlatformCheckBox><PlatformLabel htmlfor="130">Nintendo Switch</PlatformLabel></Platform>
                    <Platform><PlatformCheckBox type="checkbox" id="41" name="41" value="41" onClick={togglePlatform} ></PlatformCheckBox><PlatformLabel htmlfor="41">Nintendo Wii U</PlatformLabel></Platform>
                    <Platform><PlatformCheckBox type="checkbox" id="5" name="5" value="5" onClick={togglePlatform} ></PlatformCheckBox><PlatformLabel htmlfor="5">Nintendo Wii</PlatformLabel></Platform>
                    <Platform><PlatformCheckBox type="checkbox" id="21" name="21" value="21" onClick={togglePlatform} ></PlatformCheckBox><PlatformLabel htmlfor="21">Nintendo Gamecube</PlatformLabel></Platform>
                    <Platform><PlatformCheckBox type="checkbox" id="4" name="4" value="4" onClick={togglePlatform} ></PlatformCheckBox><PlatformLabel htmlfor="4">Nintendo N64</PlatformLabel></Platform>
                    <Platform><PlatformCheckBox type="checkbox" id="19" name="19" value="19" onClick={togglePlatform} ></PlatformCheckBox><PlatformLabel htmlfor="19">Super Nintendo Entertainment System (SNES)</PlatformLabel></Platform>
                    <Platform><PlatformCheckBox type="checkbox" id="18" name="18" value="18" onClick={togglePlatform} ></PlatformCheckBox><PlatformLabel htmlfor="18">Nintendo Entertainment System (NES)</PlatformLabel></Platform>
            </Platforms>
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
    
    padding-bottom: 5px;
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

const Platforms = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 10px;
    padding-bottom: 25px;
    border-bottom: 1px solid var(--darkhover);
`

const Platform = styled.div`
    margin: 5px;
`

const PlatformCheckBox = styled.input`

`

const PlatformLabel = styled.label`

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