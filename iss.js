/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');
const url = 'https://api.ipify.org/?format=json';
const fetchMyIP = function(callback) {
  
  request('https://api.ipify.org?format=json', (error, response, body) => {

    if (error) {
      console.log(error);
      callback(error, null);
      console.log(body);
    } else {
      const data = JSON.parse(body);
      callback(null, data['ip']);
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  });
};
const fetchCoordsByIP = function(ip, callback) {
  request(`https://api.ipgeolocationapi.com/geolocate/${ip}`,(error, response, body) => {
    if (error) {
      console.log(error);
      callback(error, null);
      console.log(body);
    } else {
      const {latitude , longitude} = JSON.parse(body).geo;
      const objIp = { latitude, longitude};
     
      callback(null, objIp);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      
    }
  });
};
const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

module.exports = nextISSTimesForMyLocation;
