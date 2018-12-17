//dependencies 
const express = require('express');
const Route = express.Router();
const fs = require('fs');
const os = require('os');
const helphers = require('../helphers/helphers');
const db = require('../db/db');
/* const multer = require('multer');
var storage =multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,'img/')
        
    },
    filename:function(req,file,callback){
       
        callback(null,`${Date.now()}-${file.originalname}`)
    }
    
})

const upload = multer({storage:storage});
,upload.fields([{name:'img',maxcount:1},{name:'name',maxcount:1}]), */

Route.post('',(req,res,next)=>{
 
    console.log(req.imageName,'try')
    var userObject = {
        name:req.body.name,
        username:req.body.username,
        password:helphers.hash(req.body.password),
        imgName:req.imageName
    }
    db.postUser(userObject,function(err,result){
        res.send({err:err,result:result})
    })
    console.log(userObject,'userobject');
  
});
    

module.exports = Route;