const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for ',
        string: true,
    }
})
.help()
.alias('help', 'h')
.argv;

const encodedArgv = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedArgv}`;
console.log(geocodeUrl);
axios.get(geocodeUrl).then((response) => {
    // console.log(response);
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address');
    }else if(response.data.status === 'OVER_QUERY_LIMIT'){
        console.log('Sorry! Over the query limit for this day.')
    }else{
     //   console.log(JSON.stringify(response.data, undefined, 2));
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        var weatherUrl = `https://api.darksky.net/forecast/ea5724f8d98ff9480bf8da267ea7dfd3/${lat},${lng}`;
        console.log(response.data.results[0].formatted_address);
        return axios.get(weatherUrl);
    }
}).then((response) => {
    var temperatureInC  = Math.round((5/9) * (response.data.currently.temperature - 32));
    var apparentTemperatureInC  = Math.round((5/9) * (response.data.currently.apparentTemperature - 32));
    console.log(`A jelenlegi hőmérséklet: ${temperatureInC}C\nÉrzet: ${apparentTemperatureInC}C` );
}).catch((e) => {
    if(e.code ==="ENOTFOUND"){
        console.log('Unable to connect to API servers.')
    }else{
        console.log(e.message);
    }
});