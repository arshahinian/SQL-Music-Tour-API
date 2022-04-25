// DEPENDENCIES
const bands = require('express').Router()
const db = require('../models')
const { Band, MeetGreet, Event, SetTime } = db
const { Op } = require('sequelize')
const meetGreet = require('../models/meetGreet')

// FIND ALL BANDS
bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll()
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
  })

// FIND A SPECIFIC BAND
bands.get('/:name', async (req, res) => {
    try {
        var _name = req.params.name ? req.params.name : '';
        console.log( `%${_name}%`)
        const foundBand = await Band.findOne({
            where: { name: { [Op.like]: `%${_name}%` } }
            ,include: [{
                model: MeetGreet
                , as: "band_meet_greets",
                include: {
                    model: Event
                    , as: "meet_greet_event"
                    , where: {name: {[Op.like]:  `%${req.query.event ? req.query.event : ''}%`}}
                }
            },{
                model: SetTime
                , as: "band_set_times",
                include: {
                    model: Event
                    , as: "set_time_event"
                    , where: {name: {[Op.like]:  `%${req.query.event ? req.query.event : ''}%`}}
                }
            }]
        })
        res.status(200).json(foundBand)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A BAND
bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newBand
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// UPDATE A BAND
bands.put('/:id', async (req, res) => {
    try {
        const updatedBands = await Band.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedBands} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A BAND
bands.delete('/:id', async (req, res) => {
    try {
        const deletedBands = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedBands} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})


// EXPORT
module.exports = bands
