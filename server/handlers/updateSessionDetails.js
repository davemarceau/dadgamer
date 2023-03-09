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
// Update session handler
// **********************************************
const updateSessionDetails = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("dadgamer");

    const _id = req.body.user;
    const session = req.body.session;
    const updatedSession = req.body.updatedSession;

    try {
        await client.connect();

        //check if user exists
        const foundUser = await db.collection("sessionsCalendar").findOne({_id: _id});

        //if it does, update the calendar
        if (foundUser) {
            const currentCalendar = foundUser.sessions;
            
            // then checks if game indeed in collection
            const inCalendar = currentCalendar.findIndex((calendarSession) => {
                return calendarSession.date == session.date && calendarSession.game.id == session.game.id;
            })

            // if in collection, update game
            if (inCalendar !== -1) {
                let updatedSessions = [...foundUser.sessions];

                updatedSessions[inCalendar] = updatedSession;

                // Sending back the calendar in the DB with the updated values
                const result = await db.collection("sessionsCalendar").updateOne( {_id: _id}, {$set: {sessions: updatedSessions }});
                
                return res.status(200).json({status: 200, message: "Session successfully updated"});
            
            // rejects the request if it is not in the calendar
            } else {
                return res.status(400).json({status: 400, message: "Game not in the user calendar for that day"});
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
module.exports = { updateSessionDetails }