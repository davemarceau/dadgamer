// **************************************************
// Required libraries and parameters for the search
// **************************************************

// Axios for API fetches
const axios = require("axios");

// Keys needed to connect to IGDB
require("dotenv").config();
const { IGDB_CLIENT_ID, IGDB_CLIENT_SECRET, TWITCH_AUTHENTICATION } = process.env;

// **************************************************
// Search for games using IGDB API
// **************************************************
const newGameSearch = async (req, res) => {
    const searchString = req.query.searchString;
    const searchPlatforms = req.query.searchPlatforms;
    let results = [];
    let fullSearchString = "";

    // updates the search string depending on if platforms are specified
    if (searchPlatforms) {
        fullSearchString = `fields name, cover.url, id, platforms.name, url, rating, first_release_date, summary; where name ~ *"${searchString}"* & platforms = (${searchPlatforms}); limit 50; sort first_release_date desc;`
    } else {
        fullSearchString = `fields name, cover.url, id, platforms.name, url, rating, first_release_date, summary; where name ~ *"${searchString}"*; limit 50; sort first_release_date desc;`
    }

    console.log(searchPlatforms);

    try {

        // Returns an error if the search is blank
        if (searchString === "") {
            return res.status(400).json({status: 400, data: [], message: "No search parameters entered"});
        }

        // Gets an authentication token from IGDB
        const token = await axios({
            method: 'post',
            url: "https://id.twitch.tv/oauth2/token",
            params: {
                client_id: IGDB_CLIENT_ID,
                client_secret: IGDB_CLIENT_SECRET,
                grant_type: "client_credentials"
            }
        })
        const authorization = "Bearer " + token.data.access_token;

        // Sends the search
        const results = await axios({
            method: 'post',
            url: "https://api.igdb.com/v4/games",
            headers: {
                "Client-ID": IGDB_CLIENT_ID,
                "Authorization": authorization,
                'Accept': 'application/json',
                "Accept-Encoding": "null",
            },
            data: fullSearchString
        })
        
        // Returns the search results
        const successMessage = results.length + " game(s) found";
        return res.status(200).json({status: 200, data: results.data, message: successMessage});
        
    } catch (error) {
        return res.status(500).json({status: 500, message: "An error has occured"});
    }
}

// **************************************************
// Export the module
// **************************************************
module.exports = { newGameSearch };