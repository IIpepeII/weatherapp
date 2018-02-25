const request = require('request');

var geocodeAddress= (address, callback) => {

    const encodedArgv = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedArgv}`,
        json: true
    }, (error, response, body) => {
        //console.log(body);
        if(error){
           callback('Unable to connect to Google servers');
        }else if(body.status === 'INVALID_REQUEST' || body.status === 'ZERO_RESULTS'){
            callback('Unable to find that address.')
        }else if(body.status === 'OK'){
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lat
            })
        }
    })
};

module.exports.geocodeAddress = geocodeAddress;
