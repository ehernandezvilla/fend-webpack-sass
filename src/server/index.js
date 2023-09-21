var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
var bodyParser = require('body-parser');
var cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();

const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = ['http://localhost:8081', 'https://example-api-express.onrender.com','http://localhost:8080'];
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};


app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
});

app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
});

app.post('/nameapi', async (req, res) => {
    try {
        const response = await fetch(`https://api.nameapi.org/rest/v5.3/parser/personnameparser?apiKey=${process.env.API_KEY}`, { //change it for localhost
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(8081, '0.0.0.0', function () {
    console.log('Example app listening on port 8081!');
});

