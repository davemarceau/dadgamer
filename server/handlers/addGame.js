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
// Add game handler
// **********************************************
const addGame = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("dadgamer");

    const _id = req.body.user;
    const game = req.body.game;

    try {
        await client.connect();

        //check if user exists
        const foundUser = await db.collection("gamesCollection").findOne({_id: _id});

        //if it does, update the collection
        if (foundUser) {
            const currentCollection = foundUser.games;
            
            // then checks if game already in collection
            const alreadyinCollection = currentCollection.findIndex((collectionGame) => {
                return collectionGame.id == game.id;
            })

            // adds if not in collection
            if (alreadyinCollection === -1) {
                const collectionUpdated = [...currentCollection, game];
                const result = await db.collection("gamesCollection").updateOne( {_id: _id}, {$set: {games: collectionUpdated }});
                return res.status(200).json({status: 200, message: "Game successfully added to collection"});
            
            // rejects the request if it already exists
            } else {
                return res.status(400).json({status: 400, message: "Game is already in the collection"});
            }

        // if not, reject the request
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

// **********************************************
// Exports the module
// **********************************************
module.exports = { addGame }