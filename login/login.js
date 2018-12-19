const express = require('express');
const Route = express.Router();
const helphers = require('./../helphers/helphers');
const db = require('./../db/db');

// requiring modules
const user = require('./../users/user');



Route.get('',(req,res,next)=>{
    console.log(req.query)
    var username = helphers.emailValidate(req.query.username)?req.query.username:false;
    var password = req.query.password;
    if(username){
        db.getPassword(username,function(err,result){
            console.log('userinner')
            console.log(password,username)
            console.log(helphers.comparePassword(password,result[0].password),'result')
          if(helphers.comparePassword(password,result[0].password)){
              console.log('jjkjjk')
              next();
          }else{res.send('incorrect password')}
            
        })
    }
},user);

//Adding friends of users
//required parameters 
//1 friends name
//2 user name
//optional parameters none
Route.post('/users',(req,res)=>{
    var friendId = req.query.friendid&&helphers.emailValidate(req.query.friendid)?req.query.friendid:false;
    var userId  =   req.body.username&&helphers.emailValidate(req.body.username)?req.body.username:false;
       
        console.log(userId,'kjf')
    if(friendId&&userId){

       db.postAddFriendToList(userId,friendId,function(err,successStatus){
           res.send({err:err,status:successStatus})
       })
    }
});


module.exports= Route;