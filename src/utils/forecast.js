import request from 'request'

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/forecast?access_key=233a9ce40d349e3c2ab4d07e2bfb6e04&' +
        '&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!")

        } else if (body.error) {
            callback("Unable to find location!")

        } else {
            const currentData = body.current
            const temp = currentData.temperature
            const feelslike = currentData.feelslike
            callback(undefined, "It is currently " + temp +
                " degrees. Feels like " + feelslike)
        }
    })
}

export {
    forecast
}