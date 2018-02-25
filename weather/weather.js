const request = require('request');

var getWeather = (lat, lng, callback) => {

    request({
        url: `https://api.darksky.net/forecast/ea5724f8d98ff9480bf8da267ea7dfd3/${lat},${lng}`,
        json: true

    }, (error, response, body) => {
        if(error){ 
            callback('Unable to connect to Forecast.io server.');
        }else if(response.statusCode === 400) {
            callback('Unable to fetch weather');
        }else if(response.statusCode === 200){
            callback(undefined,{ 
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature,
            });
        }
    });
};

module.exports.getWeather = getWeather;