//required modules
const db = require('./../db/db')
const user = (req,res)=>{
   console.log(req.query.username,'username')
db.getRandomUsers(function(err,userList){

    console.log(userList,'userlist')
        res.send(userList)
})

    
}




module.exports = user;