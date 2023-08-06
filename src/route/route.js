const express = require("express")
const router = express.Router()
const Event = require('../model/eventModel')
const eventController = require('../controller/eventController')

router.post('/events', eventController.createEvent)

router.all("/*",(req,res)=>{
    return res.status(400).send({message:"invalid path"})
})

module.exports = router;