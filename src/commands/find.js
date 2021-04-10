const { findFestival } = require('../lib/movies');

const replyFind = (festivals) => {
    let replyText = "Search Results:\n";

    festivals.forEach((festival) => {
        replyText += `* [${festival.name}](${festival.url}), ${festival.city}, ${festival.country}\n`;
    });

    return replyText;
}

const findCommand = (message) => {
    const arguments = message.split(" ");
    const genres = arguments[1];
    const location = arguments[2];

    const festivals = findFestival(genres);

    return replyFind(festivals);
};

module.exports = {
    findCommand
};