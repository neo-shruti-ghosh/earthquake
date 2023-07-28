const axios = require('axios');
const postgres = require('postgres');
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

const sql = postgres(URL, { ssl: 'require' });

const apiUrl = 'https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json';

async function checkIfEarthquakeDataExists(earthquake) {
    const { DateTime, Magnitude, Coordinates } = earthquake;
    const latitude = parseFloat(Coordinates.split(' ')[0]);
    const longitude = parseFloat(Coordinates.split(',')[1]);

    const query = sql`
        SELECT id FROM earthquakes
        WHERE datetime = ${DateTime}
        AND magnitude = ${Magnitude}
        AND latitude = ${latitude}
        AND longitude = ${longitude}
        LIMIT 1
    `;

    const result = await query;
    return result.length > 0;
}

async function insertEarthquakeData(earthquakeData) {
    try {
        for (const earthquake of earthquakeData) {
            const dataExists = await checkIfEarthquakeDataExists(earthquake);
            if (dataExists) {
                console.log('Data already exists, skipping insertion:', earthquake);
                continue;
            }

            const { DateTime, Wilayah, Magnitude, Coordinates } = earthquake;
            const latitude = parseFloat(Coordinates.split(' ')[0]);
            const longitude = parseFloat(Coordinates.split(',')[1]);

            if (isNaN(latitude) || isNaN(longitude)) {
                console.error('Invalid latitude or longitude value:', earthquake);
                continue;
            }

            const query = sql`
                INSERT INTO earthquakes (datetime, region, magnitude, latitude, longitude)
                VALUES (${DateTime}, ${Wilayah}, ${Magnitude}, ${latitude}, ${longitude})
            `;
            await query;
        }
        console.log('Earthquake data inserted successfully.');
    } catch (error) {
        console.error('Error inserting earthquake data:', error);
        throw error;
    }
}

async function scrapeEarthquakeData() {
    try {
        const response = await axios.get(apiUrl);
        const apiResponse = response.data;
        const earthquakeData = apiResponse.Infogempa.gempa;
        await insertEarthquakeData(earthquakeData);
    } catch (error) {
        console.error('Error scraping earthquake data:', error);
        throw error;
    }
}

(async () => {
    try {
        await scrapeEarthquakeData();
    } catch (error) {
        console.error('Error executing the code:', error);
    }
})();
