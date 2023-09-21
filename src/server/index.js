var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
var bodyParser = require('body-parser');
var cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();

const corsOptions = {
    origin: ['http://localhost:8080', 'https://example-api-express.onrender.com'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
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

