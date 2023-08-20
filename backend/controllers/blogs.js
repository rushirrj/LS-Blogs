const db = require('../database')
const jwt = require('jsonwebtoken')

const getBlogs= (req,res)=>{
    const q = `select * from blog.blogs `
    db.query(q,(err,data)=>{
        if(err) return res.status(500).json(`error:${err}`)
        console.log(data)
        return res.status(200).json(data)
    })
}
const getBlog=async (req,res)=>{
    try {
        const blogId  = req.params.id;
        const q=`select b.id,users.username,b.title,b.desc,b.img,b.uid,b.body from blog.blogs as b INNER JOIN users ON b.uid = users.id WHERE b.id = ?`;
        // const q = `select * from blog.blogs where id=?`
        db.query(q,[blogId],(err,data)=>{
            if(err) return res.status(500).json(`error:${err}`)
            
            if(data.length===0){
                return res.status(404).json({error:"Blog Not Found"})
            }

            res.status(200).json(data[0])
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Blog not found"})
    }
}
const addBlog= (req,res)=>{

    const q="INSERT INTO blog.blogs(`title`,`desc`,`img`,`uid`,`body`) VALUES(?)";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.img,
        req.userInfo.id,
        req.body.body,
    ];

    db.query(q,[values],(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.json("Post has been created.")
    })
   
}
const deleteBlog= (req,res)=>{
    const blogId  = req.params.id;
    const q = `DELETE FROM blog.blogs WHERE id = ? AND uid = ?`
    db.query(q,[blogId,req.userInfo.id],(err,data)=>{
    // db.query(q,[blogId,req.body.uid],(err,data)=>{
        if(err) return res.status(403).json("You can delete only your posts");

        return res.json("Blog has been deleted");
    })
}
const updateBlog= (req,res)=>{
    const blogID = req.params.id;
    const q = "UPDATE blog.blogs SET `title`=?,`desc`=?,`img`=? WHERE `id`=? AND `uid`=?"
    const values=[req.body.title,req.body.desc,req.body.img]
    db.query(q,[...values,blogID,req.userInfo.id],(err,data)=>{
        if(err) return res.status(500).json(err);

        return res.json("Post has been updated")
    })
}

module.exports = {getBlogs,getBlog,addBlog,deleteBlog,updateBlog}