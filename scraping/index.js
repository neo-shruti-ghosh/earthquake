const axios = require('axios');
const postgres = require('postgres');
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

const sql = postgres(URL, { ssl: 'require' });

const apiUrl = 'https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json';

async function insertEarthquakeData(earthquakeData) {
    try {
        for (const earthquake of earthquakeData) {
            const { DateTime, Wilayah, Magnitude, Lintang, Bujur } = earthquake;

            const latitude = parseFloat(Lintang.split(' ')[0]);

            if (isNaN(latitude)) {
                console.error('Invalid latitude value:', Lintang);
                continue;
            }

            const longitude = parseFloat(Bujur.split(' ')[0]);

            if (isNaN(longitude)) {
                console.error('Invalid longitude value:', Bujur);
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
