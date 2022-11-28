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
        const _id = Date.parse(initialDate);
        const dayOfWeek = initialDate.getUTCDay();
        if ( initialDate.getUTCDay() === 0) {
            initialWeek++;
        }

        calendarArray.push({_id: _id, dateText: initialDate, week: initialWeek, playSession: []});
        
        initialDate = new Date(initialDate.getTime() + day);
    }
    
    console.log(calendarArray);
    
    try {
        await client.connect();

        console.log("success!");
    } catch (e) {
        console.log(e);
    } finally {
        client.close();
    }
    /*// day of month
    console.log(rightNow.getDate());

    // day of week
    console.log(rightNow.getDay());

    // month
    console.log(rightNow.getMonth());

    // full year
    console.log(rightNow.getFullYear());*/
}

// **********************************************
// Trigers the calendar generation
// **********************************************
generateMongoCalendar();