const database = require('../res/database.json');

const findFestival = (genres) => {
    const keywords = genres.split(",");

    const results = database.filter((festival) => {
        const totalGenres = [];
        for (let i in keywords) {
            word = keywords[i].replace("-", " ");
            if (festival.notes.includes(word) || festival.categories.includes(word)) {
                totalGenres.push(word);
            }
        };

        if (totalGenres.length === keywords.length) {
            return true;
        }
        else {
            return false;
        }
    });

    return results;
};

module.exports = {
    findFestival
};