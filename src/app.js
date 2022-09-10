const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));


const app = express()
const port = process.env.PORT || 3000

// define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath= path.join(__dirname, '../templates/partials')



app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req,res) => {
    res.render('index', {
        title: 'weather', 
        name: 'nadav' 
    })
})

app.get('/about' , (req,res) => {
    res.render('about', {
        title: 'about Me',
        name: 'nadav'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help', 
        name: 'nadav' 
    })
})


app.get('', (req, res) => {
    res.send('hello express!')
})

app.get('/help', (req, res) => {
    res.send('help page')
})

app.get('/about', (req, res) => {
    res.send('about page')
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: ' must provide an address'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location}) => {
        if (error) {
            
            return res.send({error})
        }
        else{
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) return res.send({error})
                res.send({
                loaction: location,
                forecast: forecastData
            })  
        })
    }
    
        
    })

})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'must search somthing'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        type: 'help page',
        message: '404 pgae'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: '404 page'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port);
})