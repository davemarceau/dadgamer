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
// Update game handler
// **********************************************
const updatePlannedGameTime = async (req, res) => {
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
            
            // then checks if game indeed in collection
            const inCollection = currentCollection.findIndex((collectionGame) => {
                return collectionGame.id == game.id;
            })

            // if in collection, remove game
            if (inCollection !== -1) {
                let updatedGames = [...foundUser.games];

                const gameToUpdate = updatedGames.findIndex((collectionGame) => {
                    return game.id === collectionGame.id;
                });

                updatedGames[gameToUpdate] = game;

                // Sending back the collection in the DB with the updated values
                const result = await db.collection("gamesCollection").updateOne( {_id: _id}, {$set: {games: updatedGames }});
                
                return res.status(200).json({status: 200, message: "Game successfully updated"});
            
            // rejects the request if it is not in collection
            } else {
                return res.status(400).json({status: 400, message: "Game not in the user collection"});
            }

        // if not, reject the request
        } else {
            return res.status(404).json({status: 404, message: "User not found"});
        }
    } catch (e) {
        return res.status(500).json({status: 500, message: "An error has occured"});
    } finally {
        client.close();
    }
}

// **********************************************
// Export handler
// **********************************************
module.exports = { updatePlannedGameTime }