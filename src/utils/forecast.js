const request = require('request');
const weather = (lang,lat,callback) => {
    const Weatherurl = 'https://api.darksky.net/forecast/5d30e6309c59a08329db89c9bc8fdab7/'+lang+','+lat+'?units=si';

    request({ url: Weatherurl, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!',undefined);
        } else if (body.error) {
            callback('Unable to find location',undefined);
        } else {
            callback(undefined ,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')   
        }
    })
}
module.exports = weather;