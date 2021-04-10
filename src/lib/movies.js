const database = require('../res/database.json');

export const findFestival = (message) => {
    const keywords = message.split(",");

    const results = database.filter((festival) => {
        for (let [_index, word] in keywords) {
            if (festival.notes.includes(word)) {
                return true;
            }
        };

        return false;
    });

    return results;
};
