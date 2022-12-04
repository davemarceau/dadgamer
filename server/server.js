// Required libraries
const express = require('express');
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");

// **********************************************************
// Handlers
// **********************************************************
const { addGame } = require("./handlers/addGame");
const { removeGame } = require("./handlers/removeGame");
const { getCollection } = require("./handlers/getCollection");
const { checkNewUser } = require("./handlers/checkNewUser");
const { getUserDetails } = require("./handlers/getUserDetails");
const { updateUserDetails } = require("./handlers/updateUserDetails");
const { newGameSearch } = require("./handlers/newGameSearch");
const { updatePlannedGameTime } = require("./handlers/updatePlannedGameTime");
const { getSessionsCalendar } = require("./handlers/getSessionsCalendar");
const { addSession } = require("./handlers/addSession");
const { removeSession } = require("./handlers/removeSession");
const { updateSessionDetails } = require("./handlers/updateSessionDetails");
const { getCalendarWeek } = require("./handlers/getCalendarWeek");
const { removeGameFromSessions } = require("./handlers/removeGameFromSessions")

// Server port
const port = 6000;

// Parse the bodies
app.use(express.json());

// Protects from errors by setting headers
app.use(helmet());

// Console info on express calls
app.use(morgan("tiny"));

// **********************************************************
// Endpoints
// **********************************************************
app.post("/addgame", addGame);
app.delete("/removegame", removeGame);
app.get("/getcollection/:userid", getCollection);
app.post("/checknewuser/:userid", checkNewUser);
app.get("/getuserdetails/:userid", getUserDetails);
app.patch("/updateUserDetails/:userid", updateUserDetails);
app.get("/newgamesearch", newGameSearch);
app.patch("/updateplannedgametime", updatePlannedGameTime);
app.get("/getsessionscalendar/:userid", getSessionsCalendar);
app.post("/addsession", addSession);
app.delete("/removesession", removeSession);
app.patch("/updatesessiondetails", updateSessionDetails);
app.get("/getcalendarweek/:date", getCalendarWeek);
app.delete("/removegamefromsessions", removeGameFromSessions);

// **********************************************************
// Port listen
// **********************************************************
app.listen(port, () => {
    console.log(`Dad Gamer Server listening on port ${port}`)
});