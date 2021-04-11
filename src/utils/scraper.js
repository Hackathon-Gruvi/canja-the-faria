const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const completeFestivalList = [];
const completeFestivalListV2 = [];

let wantedCategories = [];

responsesReceived = 0;
responsesExpected = 0;

requestInterval = 100;

function getMainPageInfo() {
  currentUrl = 'https://en.wikipedia.org/wiki/List_of_film_festivals';
  baseWikiUrl = 'https://en.wikipedia.org';

  request(currentUrl, function (error, response, body) {
    if (response.statusCode != 200) {
      console.log(`ERROR - GETTING MAIN PAGE INFO!`);
    }
    if (!error && response.statusCode == 200) {
      // console.log(`SUCCESS`);
      let $ = cheerio.load(body);

      $('table:nth-of-type(1) ~ table tbody tr').each((index, element) => {
        let currFestival = {}
        currFestival.name = $('td:nth-of-type(1) a', element).text();
        if (currFestival.name === '') return;

        currFestival.url = baseWikiUrl + $('td:nth-of-type(1) a', element).attr('href');
        currFestival.est = $('td:nth-of-type(2)', element).text();
        tempCities = []
        $('td:nth-of-type(3) a', element).each((index, element) => {
          tempCities.push($(element).text())
        })
        currFestival.city = tempCities.join(' and ')
        currFestival.country = $('td:nth-of-type(4) a', element).text();
        currFestival.type = $('td:nth-of-type(5)', element).text();
        currFestival.notes = $('td:nth-of-type(6)', element).text().trim();

        if (currFestival.city === 'Oporto')
          currFestival.city = 'Porto'

        completeFestivalList.push(currFestival)
      });

      console.log(`Number of festivals: ${completeFestivalList.length}`)

      const data = JSON.stringify(completeFestivalList);
      //fs.writeFileSync('dataset.json', data);

      responsesExpected = completeFestivalList.length;

      for (let i = 0; i < completeFestivalList.length; i++) {
        const currFestival = completeFestivalList[i];

        setTimeout(() => {
          sendCustomRequest(currFestival);
        }, (i + 1) * requestInterval);
      }

    }
  });
}

function sendCustomRequest(currFestival) {
  request(currFestival.url, function (error, response, body) {
    if (response.statusCode != 200) {
      console.log(`ERROR - ${currFestival.name}!`);
      sendCustomRequest(currFestival)
    }
    if (!error && response.statusCode == 200) {
      console.log(`SUCCESS - ${currFestival.name}`);
      let $ = cheerio.load(body);

      let pageContentArray = [];
      $('span').each((index, element) => {
        let text = $(element).text();
        pageContentArray.push(text.toLowerCase());
      });

      $('td').each((index, element) => {
        let text = $(element).text();
        pageContentArray.push(text.toLowerCase());
      });

      $('p').each((index, element) => {
        let text = $(element).text();
        pageContentArray.push(text.toLowerCase());
      });

      $('a').each((index, element) => {
        let text = $(element).text();
        pageContentArray.push(text.toLowerCase());
      });

      const pageContentText = pageContentArray.join(' ');
      const foundCategories = [];

      for (const category of wantedCategories) {
        if (pageContentText.includes(category)) {
          foundCategories.push(category);
        }
      }

      currFestival.categories = foundCategories;
      completeFestivalListV2.push(currFestival);

      // console.log(currFestival)

      responsesReceived++;
    }
    // if last student
    if (responsesExpected === responsesReceived) {
      console.log("Writing to file!");
      const data = JSON.stringify(completeFestivalListV2);

      fs.writeFileSync('./src/res/database.json', data);
    }
  });
}


function updateDataset(categories = ['action', 'adventure', 'comedy', 'documentary', 'drama', 'fantasy', 'horror', 'musical', 'science fiction', 'romance', 'thriller']) {
  console.log('Starting Wikipedia Scraper');

  wantedCategories = categories;
  // https://en.wikipedia.org/wiki/List_of_film_festivals

  getMainPageInfo();
}


updateDataset();
