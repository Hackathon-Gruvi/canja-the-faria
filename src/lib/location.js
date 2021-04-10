const axios = require('axios');


export const getLocation = async () => {
  const locationData = await axios.get('http://ip-api.com/json');

  console.log(locationData);

  return {
    status: locationData.status,
    country: locationData.country,
    city: locationData.city
  };
}
