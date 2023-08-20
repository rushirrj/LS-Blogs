const express = require('express')
const router = express.Router()

// TO   CHECK IF USERS ROUTES ARE WORKING
router.get('/ping',(req,res)=>{
    res.send("pong")
})

module.exports = router