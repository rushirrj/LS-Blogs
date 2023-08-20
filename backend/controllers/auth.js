const db = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  // Check if the user is already registered
  const q = "SELECT * from blog.users where email = ? OR username = ?";
  db.query(q, [req.body.email, req.body.name], (err, data) => {
    if (err) return res.status(500).json(`error:${err}`);
    if (data.length) return res.status(409).json("User already exists");

    //  Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const q = "INSERT INTO blog.users(`username`,`email`,`password`) VALUES(?)";
    const values = [req.body.username, req.body.email, hash];
    db.query(q, [values], (err, data) => {
      console.log(data)
      if (err) return res.status(500).json(`error:${err}`);
      return res.status(200).json("user has been created");
    });
  });
};

const login = (req, res) => {
  try {
    // Check if user exists
    const q = `select * from blog.users where email= ?`;
    db.query(q, [req.body.email], (err, data) => {
      console.log(data)
      if (err) return res.status(500).json(`error:${err}`);
      if (data.length === 0) return res.status(400).json("User not found");

      // check password
      const isPasswrodCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );
      if (!isPasswrodCorrect)
        return res.status(400).json("Wrong username or password");

      const { password, ...other } = data[0];
      const token = jwt.sign({ id: data[0].id }, "jwtkey");
      return res.json({token,id:data[0].id})
    });
  } catch (error) {
    console.log(error);
  }
};


module.exports = { register, login };
