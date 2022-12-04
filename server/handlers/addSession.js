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
// Add session handler
// **********************************************
const addSession = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("dadgamer");

    const _id = req.body.user;
    const session = req.body.session;

    try {
        await client.connect();

        //check if user exists
        const foundUser = await db.collection("sessionsCalendar").findOne({_id: _id});

        //if it does, update the calendar
        if (foundUser) {
            const currentSessions = foundUser.sessions;
            
            // then checks if game already in calendar
            const alreadyinCalendar = currentSessions.findIndex((calendarSession) => {
                return calendarSession.date == session.date && calendarSession.game.id == session.game.id;
            })

            // adds if not in calendar
            if (alreadyinCalendar === -1) {
                const calendarUpdated = [...currentSessions, session];
                const result = await db.collection("sessionsCalendar").updateOne( {_id: _id}, {$set: {sessions: calendarUpdated }});
                return res.status(200).json({status: 200, message: "Session successfully added to calendar"});
            
            // rejects the request if it already exists
            } else {
                return res.status(400).json({status: 400, message: "Game is already in the calendar for that date"});
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
// Exports the module
// **********************************************
module.exports = { addSession }