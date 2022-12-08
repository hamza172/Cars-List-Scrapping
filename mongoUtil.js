const MongoClient = require("mongodb").MongoClient


var db;

function connectToServer( callback ) {
    try{
        MongoClient.connect(process.env.MONGO_URL,  { useUnifiedTopology: true , useNewUrlParser: true }, function( err, client ) {
            
            db  = client.db('CarsListing');
            console.log("Connected to mongodb")
            return callback( err );
        })

    } catch (err) {
        console.log(err)
        return err;
    }
}

function getDb() {
    return db
}

module.exports = {connectToServer, getDb}