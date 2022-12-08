var db = require( './mongoUtil.js' ).getDb();
const col = db.collection('cars')
var ObjectID = require('mongodb').ObjectID;

const Manager = {
    add:  cars => {
        col.insertOne(cars, function(err, res) {
            if (err) throw err;
                return res});
    }
};

module.exports = Manager;