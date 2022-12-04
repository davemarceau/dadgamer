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
// Remove all sessions with a specific game handler
// **********************************************
const removeGameFromSessions = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("dadgamer");

    const _id = req.body.user;
    const game = req.body.game;

    try {
        await client.connect();

        //check if user exists
        const foundUser = await db.collection("sessionsCalendar").findOne({_id: _id});

        //if it does, update the collection
        if (foundUser) {
            const currentSessions = foundUser.sessions;
            
            // then checks if game indeed in collection
            const calendarWithoutRemovedGame = currentSessions.filter((session) => {
                return game.id !== session.game.id;
            })

            // if in collection, remove game
            if (calendarWithoutRemovedGame.length > 0) {

                // updateOne because we dont delete the sessions, we just remove a session in the array
                const result = await db.collection("sessionsCalendar").updateOne( {_id: _id}, {$set: {sessions: calendarWithoutRemovedGame }});
                
                return res.status(200).json({status: 200, message: "Game successfully removed from all sessions"});
            
            // rejects the request if it is not in collection
            } else {
                return res.status(200).json({status: 400, message: "Completed, but game not in the user calendar"});
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

module.exports = { removeGameFromSessions }