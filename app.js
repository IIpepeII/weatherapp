const request = require('request');
const yargs = require('yargs');

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
request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedArgv,
  json: true
}, (error, response, body) => {
    console.log(`Address:${body.results[0].formatted_address} lat: ${body.results[0].geometry.location.lat} long
    : ${body.results[0].geometry.location.lat}`);
 // console.log(JSON.stringify(body, undefined, 2));
});