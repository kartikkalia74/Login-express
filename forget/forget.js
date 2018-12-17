// dependencies 

const express = require('express');
const Route = express.Router();
const helphers = require('./../helphers/helphers');


Route.get('',(req,res)=>{
  var username = helphers.emailValidate(req.query.username)?req.query.username:false;
})