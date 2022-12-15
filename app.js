require("dotenv").config();   
var scrapping = require('./scrapping.js')
const fs = require('fs/promises');
const { Pool  } = require('pg')
 

function loadImages(images, car_id, client){
    images.map(img=>{
        query = 'INSERT INTO images(car_id, image) VALUES ($1, $2);'
        values = [car_id, img]
        client.query(query, values)
        // .then((res) => console.log(res))
        .catch((err) => console.error('Error executing query', err.stack))
    })
}


function loadData(table, data, car_id, client){
    query = `
    INSERT INTO `+table+`(
        car_id, bodytype, brand, doors, endofproduction, generation, model, modification, "powertrainArchitecture", seats, startofproduction, acceleration100, acceleration60, acceleration62, "fuelType", "fuelconsumptionCombined", "fuelconsumptionExtraurban", "fuelconsumptionUrban", maximumspeed, dragcoefficient, fronttrack, height, length, minimumturningcircle, "rearTrack", wheelbase, width, compressionratio, "cylinderBore", engineaspiration, enginedisplacement, engineoilcapacity, "fuelSystem", "modelEngine", numberofcylinders, numberofvalvespercylinder, positionofcylinders, power, torque, drivewheel, frontbrakes, frontsuspension, "numberofGears", powersteering, rearbrakes, rearsuspension, steeringtype, tiressize, wheelrimssize, fueltankcapacity, "kerbWeight", maxload, maxweight, hotcar)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54);
    `
    values = Object.values(data);
    values = [car_id].concat(values);
    values = values.concat("false");
    console.log(values)
    client.query(query, values)
        // .then((res) => console.log(res))
        .catch((err) => console.error('Error executing query', err.stack))
}

async function processing(){
    car_id = "21231"
    var result = await scrapping(car_id)
    console.log("Data scrapping done")

    const client = new Pool ({
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        max: 20,
        idleTimeoutMillis: 60000,
        connectionTimeoutMillis: 30000,
      })
    client.connect()
    .then(() => console.log('connected with postgres'))
    .catch((err) => console.error('connection error', err.stack))
    
    loadImages(result.images, car_id, client)
    let languages = ['en','fr','es','ru','de','it','gr','tr','ro','fi','se','no','pl']
    for (let i=0;i<languages.length;i++){
        loadData(languages[i], result[languages[i]], car_id, client)
    }
   
}
processing()
