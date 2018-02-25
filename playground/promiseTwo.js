const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedArgv = encodeURIComponent(address);
    
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedArgv}`,
            json: true
        }, (error, response, body) => {
            //console.log(body);
            if(error){
                reject('Unable to connect to Google servers');
            }else if(body.status === 'INVALID_REQUEST' || body.status === 'ZERO_RESULTS'){
                reject('Unable to find that address.')
            }else if(body.status === 'OK'){
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lat
                });
            }
        });
    });
};

geocodeAddress('1098 Budapest').then((location) => {
    console.log(JSON.stringify(location, undefined,2));
}, (errorMessage) => {
    console.log(errorMessage);
});