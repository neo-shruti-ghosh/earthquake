const express = require('express');
require('dotenv').config();

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

const sql = require('postgres')(URL, { ssl: 'require' });

app.get('/earthquakes', async (req, res) => {
  try {
    const query = sql`SELECT * FROM earthquakes`;
    const earthquakeData = await query;
    const geoJSON = {
      type: 'FeatureCollection',
      features: earthquakeData.map((data) => ({
        type: 'Feature',
        properties: {
          datetime: data.datetime,
          region: data.region,
          magnitude: data.magnitude,
        },
        geometry: {
          type: 'Point',
          coordinates: [data.longitude, data.latitude],
        },
      })),
    };
    res.json(geoJSON);
  } catch (error) {
    console.error('Error fetching earthquake data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = process.env.PORT || 10000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
