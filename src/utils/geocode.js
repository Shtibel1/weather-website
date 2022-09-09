const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoia2luZ3NodGliZWwiLCJhIjoiY2w3bnNzdjZsMDBlazNubzc2dmptc3RrMSJ9.iLGmgzV_AcptnWm19jc5XA&limit=1'
    request({ url: url, json: true }, (error, response) => {
        
        if (error) {
            callback('Unable to connect to location services!', {a:0,b:0})
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', {a:0,b:0})
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode