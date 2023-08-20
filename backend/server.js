require("dotenv").config();
const PORT = process.env.PORT || 5000;
const path  = require('path')
const express  = require('express')
const cors= require("cors");
const app = express();
const users = require("./routes/users")
const blogs = require("./routes/blogs")
const auth = require("./routes/auth")
const cookieParser = require('cookie-parser')

app.use(cors());

const _dirname = path.dirname("")
const buildPath = path.join(_dirname  , "../client/build");

app.use(express.static(buildPath))
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



app.get("/", function(req, res){

    res.sendFile(
        path.join(__dirname, "../client/build/index.html"),
        function (err) {
          if (err) {
            res.status(500).send(err);
          }
        }
      );

})
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})
