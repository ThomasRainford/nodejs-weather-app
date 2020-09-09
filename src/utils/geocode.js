import request from 'request'

const geocode = (location, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        encodeURIComponent(location) +
        '.json?access_token=pk.eyJ1IjoidGhvbWFzcmFpbmZvcmQiLCJhIjoiY2tjY2ppa2VxMDR5ZDJ6bHI5d2RxNTF2MCJ9.RoKsixefPXxNHrAP_3Vi-A&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!')

        } else if (body.features.length === 0) {
            callback('Unable to find location. Please try again.')

        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

export {
    geocode
}