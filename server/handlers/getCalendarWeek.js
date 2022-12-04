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
// Returns the week data based on a date
// **********************************************
const getCalendarWeek = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("dadgamer");
    const date = Number(req.params.date);

    try {
        await client.connect();

        // Find the week based on the date received
        const calendarWeekIdentified = await db.collection("calendar").findOne({_id: date});
        const week = calendarWeekIdentified.week;

        // If date found in data, returns the week info
        if (calendarWeekIdentified) {
            const calendarWeek = await db.collection("calendar").find({week: week}).toArray();

            return res.status(200).json({status: 200, data: calendarWeek, message: "Calendar week recovered"});
        } else {
            return res.status(404).json({status: 404, message: "Date not in calendar"});
        }

    } catch (e) {
        return res.status(500).json({status: 500, message: "An error has occured"});
    } finally {
        client.close();
    }
}

// **********************************************
// Default export of handler
// **********************************************
module.exports = { getCalendarWeek }