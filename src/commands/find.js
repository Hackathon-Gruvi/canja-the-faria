const { findFestival } = require('../lib/movies');
const { filterLocation } = require('../lib/location');

const replyFind = (festivals) => {
    let replyText = "Search Results:\n";

    festivals.forEach((festival) => {
        if (festival.city !== "") {
            replyText += `* [${festival.name}](${festival.url}), ${festival.city}, ${festival.country}\n`;
        }
        else {
            replyText += `* [${festival.name}](${festival.url}), Travelling/Online Festival\n`;
        }

    });

    return replyText;
}

const findCommand = async (message) => {
    const arguments = message.split(" ");
    const genres = arguments[1];
    const location = arguments[2];

    let festivals = findFestival(genres);

    if (location != undefined) {
        festivals = await filterLocation(festivals, location);
    }

    return replyFind(festivals);
};

module.exports = {
    findCommand
};