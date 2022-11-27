// General libraries
import styled from "styled-components";
import { format } from "date-fns";
import { useContext } from "react";

// Project specific libraries
import noImagePlaceholder from "./assets/No-Image-Placeholder.png";
import { UserCollectionContext } from "./UserCollectionContext";
import { UserDetailsContext } from "./UserDetailsContext";

// **********************************************************
// Seasrch result component
// **********************************************************
const NewGameSearchResult = ({ name, cover, id, platforms, url, rating, releaseDate, summary }) => {
    const { collection, actions: { addGame } } = useContext(UserCollectionContext);
    const { details } = useContext(UserDetailsContext);
    let formattedReleaseDates = [];
    let dateResults = null;
    let coverUrl = "";
    let platformsList = ""
    
    // Update the date in proper format if there is one or returns "N/A"
    if (releaseDate) {
        formattedReleaseDates = format(new Date(releaseDate * 1000), "d MMM yyyy");
        dateResults = formattedReleaseDates;
    } else {
        dateResults = "N/A"
    }

    // Updates the cover to the URL if there is one or 
    if (cover) {
        coverUrl = cover.url;
    } else {
        coverUrl = noImagePlaceholder;
    }

    // Formats the platforms for display in a field
    if (platforms) {
        platforms.forEach((platform, index) => {
            if (index === 0) {
                platformsList = platform.name;
            } else {
                platformsList = platformsList + ", " + platform.name;
            }
        });
    } else {
        platformsList = "N/A";
    }

    // Formats the game information into an importable object
    const gameObject = { id: id, name: name, cover: coverUrl, platforms: platformsList, releaseDate: dateResults, summary: summary, timeToBeat: 0, active: true, evergreen: false };

    // Adds the game to the collection on the click of the button
    const handleClickAddGame = () => {
        addGame({ user: details._id, game: gameObject});
    }

    // validates if game already in collection
    const alreadyinCollection = collection.findIndex((collectionGame) => {
        return collectionGame.id == id;
    })
    
    // Generates the Component
    return (
        <Wrapper>
            <Link href={url} target="_blank" ><CoverArt src={coverUrl} alt="cover" /></Link>
            <Details>
                <Link href={url} target="_blank" ><GameTitle>{name}</GameTitle></Link>
                <SmallerDetails>
                    <ReleaseDate>Release dates: {dateResults}</ReleaseDate>
                    <Platforms>Platforms: {platformsList}</Platforms>
                </SmallerDetails>
            </Details>
            {alreadyinCollection === -1
                ? <AddToCollectionButton onClick={handleClickAddGame} >Add to collection</AddToCollectionButton>
                : <AddToCollectionButton disabled >Already in collection</AddToCollectionButton>
            }
        </Wrapper>
        
    )
}

// **********************************************************
// Styled components
// **********************************************************
const Wrapper = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: row;
    width: 600px;
    margin-left: auto;
    margin-right: auto;
    border-bottom: 1px solid var(--darkhover);
`;

const CoverArt = styled.img`
    height: 125px;
    width: 100px;
    border: 2px solid var(--lightbackground);
    margin: 5px;

    &:hover {
        color: var(--lighthover);
        border: 2px solid var(--lighthover);
        filter: grayscale(.7)
    }
`

const Details = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
    width: 400px;
`

const GameTitle = styled.h2`
    font-size: 20px;
    font-weight: bold;
    margin: 5px;
`

const Link = styled.a`
    color: var(--lighttext);
    margin-top: auto;
    margin-bottom: auto;
    &:hover {
        color: var(--lighthover);
    }
`

const SmallerDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const ReleaseDate = styled.div`
    font-size: 14px;
    padding: 4px;
    width: 250px;
`

const Platforms = styled.div`
    font-size: 14px;
    padding: 4px;
`

const AddToCollectionButton = styled.button`
    background-color: var(--primaryblue);
    width: 80px;
    height: 35px;
    border-radius: 8px;
    border: none;
    color: var(--lighttext);
    margin-top: auto;
    margin-bottom: auto;
    margin-left: auto;
    cursor: pointer;

    &:hover {
        background-color: var(--primaryhover);
    }

    &:disabled {
        background-color: var(--darkhover);
        cursor: not-allowed;
    }
`

// **********************************************************
// Export the component
// **********************************************************
export default NewGameSearchResult;