//dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const upload = require('./multer');
const helpher = require('./helphers/helphers');
//require module
const login = require('./login/login');
const signup = require('./signup/signup');

//app.use(bodyParser.urlencoded({extended:true}));



app.use('/signup',
upload.fields([{name:'name'},{name:'img'},{name:'username'},
                {name:'password'},{name:'confirm'},{name:'mobile'}])
                ,
                (req,res,next)=>{
                    if(req.body.name||req.body.username||req.body.password||req.body.confirm||req.files){
                        var flag = true;
                        if(!req.body.name){
                            flag=false;
                            res.send({"error":"name missing"})}
                        if(!req.body.username){
                            flag=false;
                            res.send({"error":"username missing"})
                        }else{
                                var email = helpher.emailValidate(req.body.username)       
                            if(!email){
                                flag=false;
                                res.send({"error":"username invalid"})}
                            }
                            
                        if(!req.body.password){
                            flag=false;
                            res.send({"error":"password missing"});
                        }else{
                            
                            var password = helpher.passwordValidate(req.body.password)
                            console.log(password)
                            if(!password.isValid){
                                flag=false;
                                res.send({"error":password.validationMessage})}else{
                                    if(!req.body.confirm){
                                        flag=false;
                                        res.send({"error":"confirm missing"});
                                    }else{
                                        
                                        var confirm = helpher.passwordValidate(req.body.confirm)
                                        console.log(confirm)
                                        if(!confirm.isValid){
                                            flag=false;
                                            res.send({"error":confirm.validationMessage})}else{
                                                if(req.body.password!==req.body.confirm){
                                                    res.send({error:'password not match'})
                                                    flag=false;
                                                }
                                            }    
                                        }

                                }    
                            }
                            
                            
                        
                        if(!req.body.mobile){
                            flag=false;
                            res.send({"error":"mobile missing"})
                        }else{
                           
                            var number =/^\d{10}$/
                            var mobile = typeof(req.body.mobile)==="string"&&req.body.mobile.length==10&&req.body.mobile.match(number)?req.body.mobile:false;
                            if(!mobile){ flag=false;
                                res.send('incorrect mobile')}
                        }
                        if(!req.files){console.log('files')
                            flag=false; res.send({"error":"img missing"})}
                           
                        if(flag){
                            next();
                        }
                        
                    }else{
                        res.send({"error":"invalid field"})
                    }
                }   ,signup)
     

      app.use('/login',upload.none(),login);
      app.use('/', upload.none(),(req,res,next)=>{
        res.send('primi')
    })  

module.exports = app;
