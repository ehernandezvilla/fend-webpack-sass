var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')
const fetch = require('node-fetch');


// var json = {
//     'title': 'test json response',
//     'message': 'this is a message',
//     'time': 'now'
// }

const app = express()

const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions)); //Cors with options

// app.use(cors);

// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static('dist'))

console.log(JSON.stringify(mockAPIResponse))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
})

app.post('/nameapi', async (req, res) => {
    const response = await fetch('https://api.nameapi.org/rest/v5.3/parser/personnameparser?apiKey=b00d98b772b318a7a542470251ca28fd-user1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
});


// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
