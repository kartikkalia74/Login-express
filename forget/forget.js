// dependencies 

const express = require('express');
const Route = express.Router();
const helphers = require('./../helphers/helphers');
const db  = require('./../db/db');


Route.post('',(req,res)=>{
  var username = helphers.emailValidate(req.query.username)?req.query.username:false;
  var password = req.body.password&&typeof(req.body.password)==="string"&&helphers.passwordValidate(req.body.password).isValid?req.body.password:false;
  var confirm = req.body.confirm &&typeof(req.body.confirm)==="string"&&req.body.confirm.length>0?req.body.confirm:false;

  if(password&&confirm){
    if(password===confirm){
        var newPassword =helphers.hash(password);
      db.check(username,function(err,user){
        if(user[0]){
            db.resetPassword(user[0].Id,newPassword,function(err,updateStatus){
              res.status(200).send({err,updateStatus})
            });

        }else{
          res.send({error:`no user exist with ${username}`})
        }
      })

    }else {
      res.send('password not match');
    }

  }else{
    res.send('invalid fild password and username')
  }
 
})

module.exports = Route;