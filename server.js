import config from './config';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// API
const apiUrl = 'https://api.weatherbit.io/v2.0/current?';

app.get('/get-weather', function (req, res) {
    const fetchData = async () => {
        const param = req.query.cityValue;
        const data = await axios(`${apiUrl}city=${param}&key=${config.api.key}`);
        res.send(data.data);
    };
    fetchData().catch((error) => console.error(error));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
