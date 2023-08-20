const {createConnection} = require('mysql');

 const db  = createConnection({
    host:'localhost',
    user:'root',
    password:'root123',
    database:'blog',

})


// pool.query(`select * from blog.users`,(err,result,fields)=>{
//     if(err){
//         return console.log(err);
//     }
//     return console.log(result);
// })

module.exports = db