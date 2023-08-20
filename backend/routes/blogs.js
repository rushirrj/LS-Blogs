const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/requireLogin')
const {getBlogs,getBlog,updateBlog,deleteBlog,addBlog} = require('../controllers/blogs')
// TO CHECK IF BLOGS ROUTES ARE WORKING
router.get('/ping',(req,res)=>{
    res.send("pong")
})

router.get("/",getBlogs)
router.get("/:id",getBlog)
router.post("/",verifyToken,addBlog)
router.delete("/:id",verifyToken,deleteBlog)
router.put("/:id",verifyToken,updateBlog)

module.exports = router