// **************************************************
// Required libraries and parameters for the search
// **************************************************

// Axios for API fetches
const axios = require("axios");

// Keys needed to connect to IGDB
require("dotenv").config();
const { IGDB_CLIENT_ID, IGDB_CLIENT_SECRET } = process.env;

// **************************************************
// Search for games using IGDB API
// **************************************************
const newGameSearch = async (req, res) => {
    const searchString = req.query.searchString;
    let results = [];

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
            },
            data: {
                fields: "name",
                where: "limit 10"
            }
        })

        let decoder = new TextDecoderStream("iso-8859-1");
        
        let decodedResults = decoder(results.data);

        console.log(decodedResults);

        
        // Returns the search results
        const successMessage = results.length + " game(s) found";
        return res.status(200).json({status: 200, data: results.data, message: successMessage});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: 500, message: "An error has occured"});
    }
}

// **************************************************
// Export the module
// **************************************************
module.exports = { newGameSearch }