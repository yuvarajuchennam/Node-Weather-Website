const path = require('path')
const express = require('express')
const hbs = require('hbs')

// local Files loation
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
           error:'Please give address'
        })
    }
    geocode(req.query.address, (error,{longitude,latitude,location} ={})=>{
        if(error) {
            return res.send({ error });
        }else{
            console.log(longitude,latitude ,location);
            debugger;
            forecast(longitude,latitude,(err,resp)=>{
                if(err) {
                    return res.send({ err });
                }else{
                    res.send({
                        forecast: resp,
                        location: location,
                        address:req.query.address
                    })
                    console.log(resp);
                }
            });
        }
    })
    
})
app.get('/products',(req,res) => {
   if (!req.query.search) {
       return res.send({
           erroe:'no products without search'
       })
   }
   res.send({
       products:[]
   })
})

/* End Of the code */
app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404 ',
        name: 'yuva',
        errorMessage:'help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404',{
        title: '404 ',
        name: 'yuva',
        errorMessage:'404  Page not found'
    })
})
app.listen(port, () => {
    console.log('Server is up on port '+port)
})