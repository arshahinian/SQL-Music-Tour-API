// DEPENDENCIES
const express = require('express')
//const Sequelize = require('sequelize');
const app = express()

// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//SEQUELIZE CONNECTION
//const sequelize = new Sequelize(process.env.PG_URI)

// try{
//     sequelize.authenticate()
//     console.log("CAKE WALK :)")

// } catch(e) {
//     console.log("POOP HIT THE FAN!")
// }

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})

// CONTROLLERS 
const bandsController = require('./controllers/bands_controller')
app.use('/bands', bandsController)

// CONTROLLERS 
const eventsController = require('./controllers/events_controller')
app.use('/events', eventsController)

// CONTROLLERS 
const stagesController = require('./controllers/stages_controller')
app.use('/stages', stagesController)

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
})