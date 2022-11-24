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

const checkNewUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("dadgamer");
    const userId = req.params.userid;
    const emptyDays = [0, 0, 0, 0, 0, 0 ,0]

    try {
        await client.connect();

        //check if user exists
        const foundUser = await db.collection("userDetails").findOne({_id: userId})

        //if not, create contactInfo, game collection and calendar
        if (!foundUser) {
            const contactCreated = await db.collection("userDetails").insertOne({_id: userId, preferredName: null, gender: null, availability: emptyDays, firstName: null, lastName: null});
            const collectionCreated = await db.collection("gamesCollection").insertOne({_id: userId, games: []});
            return res.status(201).json({status: 201, message: "User added"});
        } else {
            return res.status(200).json({status: 200, message: "User already exists, nothing done."});
        }
        
    } catch (e) {
        return res.status(500).json({status: 500, message: "An error has occured"});
    } finally {
        client.close();
    }
}

module.exports = { checkNewUser }