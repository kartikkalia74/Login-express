const bcrypt= require('bcrypt-nodejs');
const emailValidator = require('email-validator');
const validatePassword = require('validate-password');
const jsonWebToken = require('jsonwebtoken');

var helphers = {};

helphers.hash = function(password){
return bcrypt.hashSync(password)
}
helphers.emailValidate = function(email){
    return emailValidator.validate(email)
}

helphers.generateJsonWebToken = function(dataObject){
return jsonWebToken.sign(dataObject,'its secret')
}
helphers.verifyJsonWebToken = function(token){
    return jsonWebToken.verify(token,'its secret')
}
helphers.comparePassword = function(password,hash){
    return bcrypt.compareSync(password,hash);
}
   
    
   helphers.passwordValidate  = function(password){
    
    var validator = new validatePassword();
    
     return validator.checkPassword(password)
}


module.exports = helphers;