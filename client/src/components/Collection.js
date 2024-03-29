// generic libraries
import styled from "styled-components";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

// project specific components
import { UserCollectionContext } from "./contexts/UserCollectionContext";
import { UserCalendarContext } from "./contexts/UserCalendarContext";
import CollectionGame from "./CollectionGame";
import Loading from "./Loading";
import { useEffect } from "react";

// Generates today'S date in a format compatible with the db
const todaysDate = Math.floor(Date.now() / 1000 / 60 / 60 / 24) * 1000 * 60 * 60 * 24;

// *****************************************************************
// Component rendering the collection list
// *****************************************************************
const Collection = () => {
    const { collection } = useContext(UserCollectionContext);
    const { calendar } = useContext(UserCalendarContext);
    const [sortingType, setSortingType] = useState("");
    const [sortedCollection, setSortedCollection] = useState([]);
    const [search, setSearch] = useState("");

    // Assigns the collection to the sorted array on load
    useEffect(() => {
        setSortedCollection([...collection.games]);
    }, [collection]);

    // **********************************
    // Function handling the sort change
    const handleSortChange = (e) => {
        let tempCollection = [ ...collection.games ];
        switch (e.target.value) {
            // Alphabetical sorting picked
            case "alpha":
                setSortingType("alpha");

                tempCollection.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
                setSortedCollection([...tempCollection]);
                break;
            
            // Release date sorting picked, going descending
            case "releaseDate":
                setSortingType("releaseDate");
                const collectionWithDates = tempCollection.map((game) => {
                    let dateParts = game.releaseDate.split(" ");
                    
                    // allows for single digit dates to be in the right sort order
                    if (dateParts[0].length === 1) {
                        dateParts[0] = "0" + dateParts[0];
                    }

                    const sortableDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
                    return {...game, releaseDateSortable: sortableDate};
                });

                collectionWithDates.sort((a,b) => (a.releaseDateSortable < b.releaseDateSortable) ? 1 : ((b.releaseDateSortable < a.releaseDateSortable) ? -1 : 0));
                setSortedCollection([...collectionWithDates]);
                break;
            
            // Time played sorting picked
            case "timePlayed":
                setSortingType("timePlayed");

                // identifies all past sessions
                const pastSessions = calendar.sessions.filter((session) => {
                    return session.date < todaysDate;
                })

                // compile the duration of sessions played for each game in the collection 
                const eachGameCompiled = tempCollection.map((game) => {
                    game = {...game, totalTimePlayed: 0};
                    pastSessions.forEach((session) => {
                        if (session.game.id === game.id) {
                            game.totalTimePlayed = game.totalTimePlayed + Number(session.duration);
                        }
                    })
                    return game;
                });

                // sort them in descending order
                eachGameCompiled.sort((a, b) => {
                    return b.totalTimePlayed - a.totalTimePlayed;
                });

                setSortedCollection([...eachGameCompiled]);
                break;
            default: {
                setSortedCollection(tempCollection);
            }
        }
    }

    // Function handling the search change
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    // Function handling the search clear
    const handleClear = (e) => {
        setSearch("");
    }


    // *********************************************
    // Component render
    // *********************************************
    if (collection.hasLoaded) {
        let totalGames = 0;
        return (
            <Wrapper>
                <HeadWrapper>
                    <PageTitle>Your game collection</PageTitle>
                    <FormattedLink to="/addgame" ><AddGame>Add a game</AddGame></FormattedLink>
                </HeadWrapper>
                <CollectionSorters>
                    <SortPicker>
                        <span>Sort collection by: </span>
                        <PickList id="sortType" placeholder="Pick sort order" value={sortingType ? sortingType : ""} onChange={handleSortChange}>
                                <option value="" disabled >Pick sort order</option>
                                <option value="alpha">Alphabetical</option>
                                <option value="releaseDate">Release Date</option>
                                <option value="timePlayed">Time Played</option>
                        </PickList>
                    </SortPicker>
                    <CollectionSearch placeholder="Search for a game here" value={search} onChange={handleSearchChange} ></CollectionSearch>
                    <ClearSearch onClick={handleClear} >Clear</ClearSearch>
                </CollectionSorters>
                <TheCollection>
                    {
                        sortedCollection.map((game) => {
                            // Only returns a game if it matches the search results
                            if (game.name.toLowerCase().includes(search.toLowerCase())) {
                                totalGames++;
                                return <CollectionGame game={game} key={game.id} />
                            } else {
                                return ""
                            }
                        })
                    }
                    {totalGames ? "" : "No games found"}
                </TheCollection>
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

const CollectionSorters = styled.div`
    display: flex;
    flex-direction: row;
    padding: 5px;
    height: 30px;
    align-items: center;
`

const SortPicker = styled.div`
    display: flex;
    flex-direction: row;
    padding: 5px;
`

const PickList = styled.select`
    width: 170px;
    margin-left: 5px;
    padding: 4px;
    height: 25px;
`

const CollectionSearch = styled.input`
    width: 300px;
    height: 12px;
    padding: 5px;
    margin-left: 5px;
`

const ClearSearch = styled.button`
    background-color: var(--primaryblue);
    width: 42px;
    height: 24px;
    //border-radius: 6px;
    border: none;
    color: var(--lighttext);
    position: relative;
    left: -43px;
    cursor: pointer;

    &:hover {
        background-color: var(--primaryhover);
    }

    &:disabled {
        background-color: var(--darkhover);
        cursor: wait;
    }
`

const TheCollection = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
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

const FormattedLink = styled(Link)`
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