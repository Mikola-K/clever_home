const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./database.js')
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const axios = require('axios')

var sensorValue, temperatureValue, humidityValue, temperaturePost, humidityPost

const port = new SerialPort({ path: "COM3", baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))

port.on("open", () => {
    console.log('serial port open');
});

function post() {
    axios.post(
        "http://localhost:3036/temperature/add",
        temperaturePost,{headers: { "Content-Type": "application/json" }})
        .then((res) => {})
        .catch((err) => {
            console.log(err);
        });

    axios.post(
        "http://localhost:3036/humidity/add",
        humidityPost,{headers: { "Content-Type": "application/json" }})
        .then((res) => {})
        .catch((err) => {
            console.log(err);
        });
}

parser.on('data', data => {
    sensorValue = data.split(',')
    temperatureValue = sensorValue[0]
    humidityValue = sensorValue[1]
    
    temperaturePost = JSON.stringify({
        temperatureValue: temperatureValue
    })

    humidityPost = JSON.stringify({
        humidityValue: humidityValue
    })
    app.get("/getOnMotor", (req, res) => {
        port.write('a')
        res.send("Turn on")
      })
    
    app.get("/getOffMotor", (req, res) => {
        port.write('b')
        res.send("Turn off")
    })
    app.get("/getOnLed", (req, res) => {
        port.write('c')
        res.send("Turn on")
    })
    app.get("/getOffLed", (req, res) => {
        port.write('d')
        res.send("Turn off")
    })
    app.get("/getOnLamp", (req, res) => {
        port.write('e')
        res.send("Turn on")
    })
    app.get("/getOffLamp", (req, res) => {
        port.write('f');
        res.send("Turn off")
    })
    app.get("/getOnHumidifier", (req, res) => {
        port.write('g')
        res.send("Turn on")
    })
    app.get("/getOffHumidifier", (req, res) => {
        port.write('h');
        res.send("Turn off")
    })
    app.get("/getOnRadiator", (req, res) => {
        port.write('i')
        res.send("Turn on")
    })
    app.get("/getOffRadiator", (req, res) => {
        port.write('j');
        res.send("Turn off")
    })
});

setInterval(post, 5000) //  3 600 000 - 1 hour

app.use(cors())
app.use(express.json());

app.get('/temperature', (req, res) => {
    db.query('select value from `clever_home`.`temperature`',
    function (err, result, fields) {
        res.json(result);
    }
    );
})

app.post('/temperature/add', (req, res) => {
    let temperature = req.body.temperatureValue
    db.query('INSERT INTO `clever_home`.`temperature`(`value`) VALUES (?);',
        temperature, 
        function (err, result, fields) {
            console.log (result, 'result of temperature get value')
            res.json(result);
        }
    );
})

app.get('/humidity', (req, res) => {
    db.query('select value from `clever_home`.`humidity`',
        function (err, result, fields) {
            res.json(result);
            console.log (result, 'result of humiditty get value')
        }
    );
})

app.post('/humidity/add', (req, res) => {
    let humidity = req.body.humidityValue
    db.query('INSERT INTO `clever_home`.`humidity`(`value`) VALUES (?);',
        humidity, 
        function (err, result, fields) {
            console.log(result, 'post humidity value');
            res.json(result);
        }
    );
})

app.listen(3036, () => console.log("server has been started on port 3036"))