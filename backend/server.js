require("dotenv").config();
const PORT = process.env.PORT || 5000;
const express  = require('express')
const cors= require("cors");
const app = express();
const users = require("./routes/users")
const blogs = require("./routes/blogs")
const auth = require("./routes/auth")
const cookieParser = require('cookie-parser')

app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:3000', // Replace with your frontend URL
//     credentials: true, // Enable cookies and other credentials
//   }));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser())
app.use("/users",users);
app.use("/blogs",blogs);
app.use("/auth",auth);



app.get('/',(req,res)=>{
    res.send(`Congrats server is live on ${PORT}`)
})
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})
