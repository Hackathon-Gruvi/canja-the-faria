const axios = require('axios');

const getLocation = async () => {
  const locationData = await axios.get('http://ip-api.com/json');
  console.log(locationData);

  return {
    status: locationData.data.status,
    country: locationData.data.country,
    city: locationData.data.city
  };
}

const filterLocation = async (festivals, location) => {
  let festivalLocation = location;

  if (location == "near") {
    const currentLocation = await getLocation();
    festivalLocation = currentLocation.city;
  }

  return festivals.filter((festival) => {
    if (festival.city === festivalLocation || festival.country === festivalLocation) {
      return true;
    }

    return false;
  });
}

module.exports = {
  filterLocation
};