// **********************************************
// Preps the parameters for the Mongo connection
// **********************************************
const { MongoClient } = require("mongodb");
const cloudinary = require("cloudinary").v2;

require("dotenv").config();
const { MONGO_URI, CLOUDINARY_URL } = process.env;

cloudinary.config({secure: true});

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}


const updateUserDetails = async (req, res) => {
    const client = new MongoClient(MONGO_URI, mongoOptions);
    const db = client.db("dadgamer");
    const userId = req.params.userid;
    const newDetails = req.body;

    // converts availability from text fields into actual numbers for later use
    newDetails.availability.forEach((day, index) => {
        newDetails.availability[index] = Number(day);
    });

    try {
        await client.connect();

        //check if user exists
        const foundUser = await db.collection("userDetails").findOne({_id: userId})

        if (foundUser) {
            
            const updated = await db.collection("userDetails").updateOne({_id: userId}, {$set: newDetails});
            return res.status(200).json({status: 200, message: "User details updated successfully"});
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

module.exports = { updateUserDetails }