const database = require('../res/database.json');

const findFestival = (genres) => {
    const keywords = genres.split(",");

    const results = database.filter((festival) => {
        for (let i in keywords) {
            word = keywords[i];
            if (festival.notes.includes(word) || festival.categories.includes(word)) {
                return true;
            }
        };

        return false;
    });

    return results;
};

module.exports = {
    findFestival
};