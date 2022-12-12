require("dotenv").config();   
var scrapping = require('./scrapping.js')
const fs = require('fs/promises');

var request = require('request').defaults({ encoding: null });

async function imageConvert(url){
    await request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            data = "data:" + response.headers["content-type"] + ";base64," + Buffer.from(body).toString('base64');
            return data;
        }
        else    
            console.log(error)
    });
}



async function processing(){
    var result = await scrapping("21231")
    result.images.map(async img=>{
        img = await imageConvert(img)
    })
    console.log(result)
}
processing()
