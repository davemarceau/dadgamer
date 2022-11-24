// Required libraries
const express = require('express');
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");

// Handlers
const { addGame } = require("./handlers/addGame");
const { removeGame } = require("./handlers/removeGame");
const { findInCollection } = require("./handlers/findInCollection");
const { getCollection } = require("./handlers/getCollection");
const { checkNewUser } = require("./handlers/checkNewUser");
const { getUserDetails } = require("./handlers/getUserDetails");
const { updateContactInfo } = require("./handlers/updateContactInfo");
const { gameDetails } = require("./handlers/gameDetails");
const { newGameSearch } = require("./handlers/newGameSearch");
const { updatePlannedGameTime } = require("./handlers/updatePlannedGameTime");

// Server port
const port = 6000;

// Parse the bodies
app.use(express.json());

// Protects from errors by setting headers
app.use(helmet());

// Console info on express calls
app.use(morgan("tiny"));

// Endpoints
app.post("/addgame", addGame);
app.delete("/removegame", removeGame);
app.get("/findincollection", findInCollection);
app.get("/getcollection/:userid", getCollection);
app.post("/checknewuser/:userid", checkNewUser);
app.get("/getuserdetails/:userid", getUserDetails);
app.patch("/updatecontactinfo/:userid", updateContactInfo);
app.get("/gamedetails", gameDetails);
app.get("/newgamesearch", newGameSearch);
app.patch("/updateplannedgametime", updatePlannedGameTime);


// Port listen
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});