require("dotenv").config();   
var scrapping = require('./scrapping.js')
const fs = require('fs/promises');

var request = require('request').defaults({ encoding: null });




async function processing(){
    var result = await scrapping("21231")
    console.log(result)
}
processing()
