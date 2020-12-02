const request = require('request-promise-native');
const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://api.ipgeolocationapi.com/geolocate/${ip}`);
};

module.exports = { fetchMyIP, fetchCoordsByIP };
