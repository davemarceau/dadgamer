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
// Function to generate the base calendar
// **********************************************
const generateMongoCalendar = async () => {
    // DB connection info
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("dadgamer");
    
    // Initial values to build the calendar
    let calendarArray = []
    let initialDate = new Date("2022-01-01")
    const daysPerYear = 365.25;
    const yearsToBuild = 4;
    const day = 60 * 60 * 24 * 1000;
    let initialWeek = 0;

    // Build the array based on parameters
    for (let i=0; i <= (daysPerYear * yearsToBuild); i++) {
    //for (let i=0; i <= (33); i++) {
        const _id = Date.parse(initialDate);
        const dayOfWeek = initialDate.getUTCDay();
        if ( initialDate.getUTCDay() === 0) {
            initialWeek++;
        }

        const monthDay = initialDate.getUTCDate();
        const weekDay = initialDate.getUTCDay();
        const month = initialDate.getUTCMonth();
        const year = initialDate.getFullYear();

        calendarArray.push({_id: _id, dateText: initialDate, week: initialWeek, weekDay: weekDay, monthDay: monthDay, month: month, year: year});
        
        initialDate = new Date(initialDate.getTime() + day);
    }
    
    console.log(calendarArray);
    
    try {
        await client.connect();

        await db.collection("calendar").insertMany(calendarArray);

        console.log("success!");
    } catch (e) {
        console.log(e);
    } finally {
        client.close();
    }
}

// **********************************************
// Trigers the calendar generation
// **********************************************

generateMongoCalendar();