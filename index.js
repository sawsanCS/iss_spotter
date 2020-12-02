const {fetchMyIP, fetchCoordsByIP} = require('./iss');
let myUrl = 'https://ipvigilante.com/72.141.69.246';

fetchCoordsByIP(myUrl, (error, url) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('here is your url' , url);
});
