// **********************************************
// Preps the parameters for the Mongo connection
// **********************************************
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

// **********************************************
// Returns the full game collection of the user
// **********************************************
const getCollection = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("dadgamer");
    const userId = req.params.userid;

    try {
        await client.connect();

        const userCollection = await db.collection("gamesCollection").findOne({_id: userId});

        if (userCollection) {
            return res.status(200).json({status: 200, data: userCollection.games, message: "User collection recovered"});
        } else {
            return res.status(404).json({status: 404, message: "User not found"});
        }

    } catch (e) {
        console.log(e);
        return res.status(500).json({status: 500, message: "An error has occured"});
    } finally {
        client.close();
    }
}

module.exports = { getCollection }