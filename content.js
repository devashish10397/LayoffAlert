const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeData() {
    try {
        const response = await axios.get('https://www.warntracker.com');
        const $ = cheerio.load(response.data);

        // Use CSS selectors to target the specific data you want
        const layoffs = $('.layoff-list').text();

        // Process and manipulate the retrieved data as needed
        console.log(layoffs);
    } catch (error) {
        console.error('Error scraping data:', error);
    }
}

scrapeData();
