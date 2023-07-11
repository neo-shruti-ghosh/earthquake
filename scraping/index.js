const axios = require('axios');
const { Client } = require('pg');

const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'earthquake_data',
    password: 'password',
    port: 5432,
};

const apiUrl = 'https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json';

async function insertEarthquakeData(earthquakeData) {
    const client = new Client(dbConfig);
    await client.connect();

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

            const query = {
                text: 'INSERT INTO earthquakes (datetime, region, magnitude, latitude, longitude) VALUES ($1, $2, $3, $4, $5)',
                values: [DateTime, Wilayah, Magnitude, latitude, longitude],
            };
            await client.query(query);
        }
        console.log('Earthquake data inserted successfully.');
    } catch (error) {
        console.error('Error inserting earthquake data:', error);
        throw error;
    } finally {
        await client.end();
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
