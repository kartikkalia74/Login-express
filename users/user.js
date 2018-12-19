//required modules
const db = require('./../db/db')
const helphers = require('./../helphers/helphers');
const user = (req,res)=>{
   console.log(req.query.username,'username')
   var responseObject ={};
db.getRandomUsers(req.query.username,function(error,userLists){
    if(!error&&userLists){
        responseObject.userLists=userLists;
        db.getFriendList(req.query.username,function(friendsLists){
            responseObject.friendsLists=friendsLists;
            
        })
        var tokenObject = {
            exp :Math.floor(Date.now()/1000)+60*60,
            data:responseObject
        }
        var token =helphers.generateJsonWebToken(tokenObject);
        db.updateToken(token,req.query.username,function(err,result){
            if(!err&&result){
                res.send(token)
                console.log('sucess')
            }
        })
      
    }
 
    
    console.log(userLists,'userlist')
        
})



    
}




module.exports = user;