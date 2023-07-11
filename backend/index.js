const express = require('express');
const { Client } = require('pg');

const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'earthquake_data',
    password: 'password',
    port: 5432,
};

const client = new Client(dbConfig);
client.connect();

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/earthquakes', async (req, res) => {
    try {
        const query = 'SELECT * FROM earthquakes';
        const result = await client.query(query);
        const earthquakeData = result.rows;
        // res.json(earthquakeData);
        const geoJSON = {
            type: "FeatureCollection",
            features: earthquakeData.map(data => ({
              type: "Feature",
              properties: {
                datetime: data.datetime,
                region: data.region,
                magnitude: data.magnitude
              },
              geometry: {
                type: "Point",
                coordinates: [data.longitude, data.latitude]
              }
            }))
          };
          res.json(geoJSON);
    } catch (error) {
        console.error('Error fetching earthquake data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const port = 5002;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
