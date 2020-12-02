const {nextISSTimesForMyLocation} = require('./iss');
const myUrl = `https://api.ipgeolocationapi.com/geolocate/72.141.69.246`;
const Coords = { latitude: '49.27670', longitude: '-123.13000' };

fetchISSFlyOverTimes(Coords, (error, passTimes) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log('It worked! Returned flyover times:' , passTimes);
});
fetchCoordsByIP(myUrl, (error, coords) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('here is your url' , coords);
});

