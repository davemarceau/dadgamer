// **************************************************
// Required fpr apicalypsse because modules are async and this is cjs
// **************************************************
const requireModule = (modulePath, exportName) => {
    try {
        const imported = require(modulePath);
        return exportName ? imported[exportName] : imported;
    } catch (err) {
        return err.code;
    }
}

//import * as name from moduleName
//import * as apicalypse from apicalypse;
const apicalypse = import("apicalypse");


// **************************************************
// Required libraries and parameters for the search
// **************************************************

// Axios for API fetches
const axios = require("axios");

// Keys needed to connect to IGDB
require("dotenv").config();
/*import * as dotenv from "dotenv"
dotenv.config();*/
const { IGDB_CLIENT_ID, IGDB_CLIENT_SECRET, TWITCH_AUTHENTICATION } = process.env;

//import apicalypse from 'apicalypse';

//import { default as apicalypse } from "apicalypse"

// **************************************************
// Search for games using IGDB API
// **************************************************
const newGameSearch = async (req, res) => {
    const searchString = req.query.searchString;
    let results = [];

    //const apicalypse = requireModule("../node_modules/apicalypse/src/index.js");

    const authenticationOptions = {
        querymethod: "url",
        method: "post",
        baseURL: "https://id.twitch.tv/oauth2",
        headers: {
            'Accept': 'application/json'
        }
    }

    

    try {
        
        //const apicalypse = await import("apicalypse");

        // Returns an error if the search is blank
        if (searchString === "") {
            return res.status(400).json({status: 400, data: [], message: "No search parameters entered"});
        }

        /*const authentication = await apicalypse(authenticationOptions)
            .query( "client_id = IGDB_CLIENT_ID & client_secret = IGDB_CLIENT_SECRET & grant_type = client_credentials" )
            .request("/token");*/
        /*apicalypse()
            .request(TWITCH_AUTHENTICATION)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
        console.log(apicalypse);*/

        //const test = await apicalypse(authenticationOptions);


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
            /*data: {
                "fields": "name",
                "where": "name ~ " + searchString + "*"
            }*/
            data: "fields involved_companies.*; where involved_companies != null;"
        })
        
        console.log(results);
        
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

//export default newGameSearch;