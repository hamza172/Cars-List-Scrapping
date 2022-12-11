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
    // var result = await scrapping("21231")
    images = [
        'https://qesot.com/img_dir/cars/9843-bmw-6-series-e63-2005-1.jpeg',
        'https://qesot.com/img_dir/cars/9843-bmw-6-series-e63-2005-2.jpeg',
        'https://qesot.com/img_dir/cars/9843-bmw-6-series-e63-2005-3.jpeg',
        'https://qesot.com/img_dir/cars/9843-bmw-6-series-e63-2005-4.jpeg',
        'https://qesot.com/img_dir/cars/9843-bmw-6-series-e63-2005-5.jpeg',
        'https://qesot.com/img_dir/cars/9843-bmw-6-series-e63-2005-6.jpeg',
        'https://qesot.com/img_dir/cars/9843-bmw-6-series-e63-2005-7.jpeg',
        'https://qesot.com/img_dir/cars/9843-bmw-6-series-e63-2005-8.jpeg'
      ]
    // images.map(async img=>{
    //     img = await imageConvert(img)
    // })
    result = await imageConvert(images[0])
    console.log(result)
}
processing()
