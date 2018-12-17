const bcrypt= require('bcrypt-nodejs');
const emailValidator = require('email-validator');
const validatePassword = require('validate-password');

var helphers = {};

helphers.hash = function(password){
return bcrypt.hashSync(password)
}
helphers.emailValidate = function(email){
    return emailValidator.validate(email)
}

helphers.comparePassword = function(password,hash){
    return bcrypt.compareSync(password,hash);
}
   
    
   helphers.passwordValidate  = function(password){
    
    var validator = new validatePassword();
    
     return validator.checkPassword(password)
}


module.exports = helphers;