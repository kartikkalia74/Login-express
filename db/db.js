const mySql = require('mysql');
var query;
var db = {
    getPassword:function(username,callback){
        console.log(username,'db')
        query = `SELECT password FROM userObject WHERE username= '${username}'`;
        performQuery(query,function(err,result){
            callback(err,result)
        })
    },
    postUser:function(userObject,callback){
        query =`INSERT INTO userObject(name,username,password,imgName)  VALUES('${userObject.name}','${userObject.username}','${userObject.password}','${userObject.imgName}')`
        performQuery(query,function(err,result){
            callback(err,result)
        })
    },
    getFriendList:function(username){
        query =`SELECT * FROM userFriendList  WHERE username=${username}`;
        performQuery(query,function(err,result){

        })
    },
    getRandomUsers:function(callback){
  
        query =`SELECT name ,imgName FROM userObject`;
            performQuery(query,function(err,result){
                   console.log(result,'rendomusers')
                   callback(err,result)
            })
    },
    put:function(){},
    delete:function(){}
};

const performQuery = function(query,callback){
   var connection= mySql.createConnection({
       host:'localhost',
       user:'root',
       password:'redhat',
       database:'kartik'
   })
   connection.connect((err)=>{
       if(err) throw err;
       console.log(query)
       console.log('connected');
       connection.query(query,function(err,result){
           if(err) throw err;
           callback(err,result)
       })
   })
}
module.exports = db;