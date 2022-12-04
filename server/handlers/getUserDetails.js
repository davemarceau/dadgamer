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
// Handler returning the user details
// **********************************************
const getUserDetails = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("dadgamer");
    const userId = req.params.userid;

    try {
        await client.connect();
        
        // Checks if the user is in the db
        const userDetails = await db.collection("userDetails").findOne({_id: userId});

        // If he is, returns his info
        if (userDetails) {
            return res.status(200).json({status: 200, data: userDetails, message: "UserDetails identified"});
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
// Default export of the handler
// **********************************************
module.exports = { getUserDetails }