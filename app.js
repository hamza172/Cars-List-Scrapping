require("dotenv").config();   
var mongoUtil = require( './mongoUtil.js' );
var scrapping = require('./scrapping.js')

mongoUtil.connectToServer(async function( err, client ) {
    var manager = require('./mongoManger')
    var result = await scrapping("21231")
    console.log(result)
    await manager.add(result)
})
