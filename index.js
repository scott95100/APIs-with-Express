// gives us access to variables in our .env
require('dotenv').config()

////see varibales using process.env/////
// console.log(process.env.API_KEY)

const express = require('express')
const app = express()
const axios = require('axios')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

////////MiddleWare/////////
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.use(express.urlencoded( {extended: false}))
app.use(methodOverride('_method'))

////////ROUTES/////////////
//test for route running
app.get('/', (req, res)=> {
    res.send('hello')
})

app.get('/omdb', (req, res)=> {
    const qs= {
        params: {
            s: 'star wars',
            apikey: process.env.API_KEY
        }
    }
    axios.get('http://www.omdbapi.com', qs)
    .then((response)=> {
        
        
    })
})

//with Swapi api
app.get('/swapi/search', (req, res)=> {
    res.render('search')
})

app.get('/swapi/show', (req, res)=> {
    console.log('made it here')
    console.log('query', req.query)
    axios.get(`http://swapi.dev/api/people/${req.query.personId}`)
    .then((response)=> {
        console.log(response.data)
        //make a person object
        const person = {
            name: response.data.name,
            birth: response.data['birth_year'],
            home: response.data.homeworld
        }
        res.render('show', person)
    })
})


/////////SERVER PORT/////////
const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Listening on ${PORT}`))