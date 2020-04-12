const path = require('path') //inbuilt within nodejs
const express = require('express') //npm package
const hbs = require('hbs')
const geoCode = require('./utlis/geoCode')
const forecast = require('./utlis/forecast')


const app = express()
const port = process.env.PORT || 3000


//define path for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebars (hbs) engine and custom 'views' location
app.set('view engine', 'hbs') //setup view engine to accept hbs files
app.set('views', viewsPath) //setup a custom 'views' directory to a custom dir (/templates)
hbs.registerPartials(partialsPath) //setup hbs

//setup static (base) dir to serve
app.use(express.static(publicDirPath))


//rendering dynamic files from hbs with expressjs

//root page
app.get('', (req, res) => {
    res.render('index', 
    {
        title: 'Weatherly',
        name: 'Joey'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about_me...',
        name: 'Joey'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        p: 'This is where I pretend to help you :)',
        title: 'help_page',
        name: 'Joey'
    })
})

app.get('/weather', (req, res) => {
    
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geoCode(req.query.address, (error, { latitude, longitude, location } = { }) => {
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
                searched: req.query.address
            })  
        })
    })
})

app.get('/products', (req, res) => {
    
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Weatherly',
        name: 'Joey',
        error: 'Help article not found'
    })
})

//this should always be last due to *
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Weatherly',
        name: 'Joey',
        error: 'Page not found'
    })
})


//port 3000 = local shit
app.listen(port, () => {
    console.log(`server started on port ${port}`)
})