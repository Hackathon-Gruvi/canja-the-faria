const database = require('../res/database.json');

const findFestival = (genres) => {
    const keywords = genres.split(",");

    console.log(keywords);

    const results = database.filter((festival) => {
        for (let i in keywords) {
            if (festival.notes.includes(keywords[i])) {
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