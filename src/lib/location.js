const axios = require('axios');


const getLocation = async () => {
  const locationData = await axios.get('http://ip-api.com/json');

  console.log(locationData);

  return {
    status: locationData.status,
    country: locationData.country,
    city: locationData.city
  };
}

module.exports = {
  getLocation
};