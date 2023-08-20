const express = require('express')
const router = express.Router()
const {register,login,logout} = require('../controllers/auth')
const db = require('../database')
// TO   TES IF AUTH ROUTES ARE WORKING
router.get('/ping',(req,res)=>{
    res.send("pong")
})

router.post("/register",register);
router.post("/login",login);




module.exports = router