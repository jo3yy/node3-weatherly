const request = require('request');

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoiam9rM3JyciIsImEiOiJjazhzbWxpbGcwN3c3M2dxZjg1ZmRuemxzIn0.8KA-jWrfTr0ibVlBzE59hA&limit=1`;

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback(`Unable to Connect to Locaton Services!`, undefined)
        } else if (body.features.length === 0) {
            callback(`Unable to Connect to Locaton Services!, Try another Search `, undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    });
}

module.exports = geoCode;