const axios = require("axios");

require("dotenv").config();
const { IGDB_CLIENT_ID, IGDB_CLIENT_SECRET } = process.env;

const newGameSearch = async (req, res) => {
    const searchString = req.query.searchString;
    let results = [];

    try {
        
        if (searchString === "") {
            return res.status(400).json({status: 400, data: [], message: "No search parameters entered"});
        }

        const token = await axios({
            method: 'post',
            url: "https://id.twitch.tv/oauth2/token",
            params: {
                client_id: IGDB_CLIENT_ID,
                client_secret: IGDB_CLIENT_SECRET,
                grant_type: "client_credentials"
            }
        })

        
        const successMessage = results.length + " game(s) found";
        return res.status(200).json({status: 200, data: token.data, message: successMessage});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: 500, message: "An error has occured"});
    }
}

module.exports = { newGameSearch }