const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9fdd256ead721907a2cf99988aae7cb4&query=' + latitude + ',' + longitude

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.location.name + ' It is currently ' + response.body.current.temperature + ' degress out. There is a feel of ' + response.body.current.feelslike
            + ' and the wind speed is ' + response.body.current.wind_speed)
        }
    })
}

module.exports = forecast