const request = require("request");

const forecast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=bc5c125c8e6958fbbc98f2565c3b2e0f&query=${encodeURIComponent(lat)},${encodeURIComponent(lon)}&unit=c`;

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback(`Unable to Connect! Check your internet`, undefined);
        } else if (body.error) {
            callback(`Unable to Find your Locaton!, Try another Search`, undefined)
        } else {
            callback(undefined, `It is currently ${body.current.temperature} degrees out. The humidity is ${body.current.humidity}% With the wind speed of ${body.current.wind_speed}km/hr`);
        }
    });
}

module.exports = forecast;