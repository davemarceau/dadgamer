// **********************************************
// Preps the parameters for the Mongo connection
// **********************************************
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

/*import { MongoClient } from "mongodb";

import * as dotenv from "dotenv"
dotenv.config();
const { MONGO_URI } = process.env;*/

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const addGame = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("dadgamer");

    try {
        await client.connect();

        return res.status(200).json({status: 200, message: "Hello"});
    } catch (e) {
        return res.status(500).json({status: 500, message: "An error has occured"});
    } finally {
        client.close();
    }
}

module.exports = { addGame }

//export default addGame;