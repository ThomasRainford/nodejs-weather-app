
import { forecast } from './utils/forecast.js'
import { geocode } from './utils/geocode.js'
import path from 'path'
import express from 'express'
import hbs from 'hbs'

const __dirname = path.resolve()

const app = express()

// Define paths for Express config.
const publicDirectory = path.join(__dirname, '/public')
const viewsPath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')

// Setup handlebars engine and views location.
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve.
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Thomas Rainford'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Thomas Rainford'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Thomas Rainford',
        message: 'Need help?'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Thomas Rainford',
        message: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Thomas Rainford',
        message: 'Page not found!'
    })
})

app.listen(3000, () => {
    console.log('Server Running! Port 3000.')
})