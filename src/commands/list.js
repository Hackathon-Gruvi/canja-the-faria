const { listLocations } = require('../lib/movies');
const { genreKeywords } = require('../lib/database');

const replyGenres = (genres) => {
  let replyText = "Film Genres:\n";

  genres.forEach((genre) => {
    replyText += `* ${genre}\n`;
  });

  return replyText;
}

const replyLocations = (locations) => {
  let replyText = "Film Festival Locations:\n";

  locations.forEach((location) => {
    replyText += `* ${location}\n`;
  });

  return replyText;
}

const listCommand = async (message) => {
  const arguments = message.split(" ");
  const command = arguments[1];

  if (command === "genres") {
    return replyGenres(genreKeywords);
  }
  else if (command === "locations") {
    const locations = listLocations();
    return replyLocations(locations);
  }

  return "Unrecognized command";
};

module.exports = {
  listCommand
};