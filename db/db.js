const mySql = require('mysql');
var query;
var db = {
    // getting  password of username 
    //table used userObject
    getPassword:function(username,callback){
        console.log(username,'db')
        query = `SELECT password FROM userObject WHERE username= '${username}'`;
        performQuery(query,function(err,result){
            callback(err,result)
        })
    },
    resetPassword:function(userId,hashPassword,callback){
        query =`UPDATE userObject SET password='${hashPassword}' WHERE Id='${userId}'`;
        performQuery(query,function(err,updateStatus){
                console.log(updateStatus,'kjfs')
            callback(err,updateStatus);
        })

    },
    // inserting user to users
    //tables used userObject
    postUser:function(userObject,callback){
        query =`INSERT INTO userObject(name,username,password,imgName,token)  VALUES('${userObject.name}','${userObject.username}','${userObject.password}','${userObject.imgName}','${userObject.token}')`
        performQuery(query,function(err,result){
            callback(err,result)
        })
    },
    // get friends of user
    //tables used userObject ,[user]Friends
    //[user] -> dynamic 
    //required fields username 
    getFriendList:function(username,callback){
        console.log(username,'username')
        this.getName(username,(name)=>{
            console.log(name,'name')
            this.IsTableExists(name,(table)=>{
                console.log(table,'table')
                if(table){
                    query =`SELECT name , username FROM ${table}`;
            performQuery(query,function(result){
                if(err){
                    console.log(result,'hfh')
                    callback(result)
                }
                
            })
                }else{callback(null)}
            })
            
        })
       
    },
    //get all the users exists
    //tables used userObject
    getRandomUsers:function(username,callback){
  
        query =`SELECT name ,imgName FROM userObject WHERE username!='${username}'`;
            performQuery(query,function(err,result){
                   console.log(result,'rendomusers')
                   callback(err,result)
            })
    },
    //adding friend to user friend list
    //tables used userObject [user]Friends 
    //[user]-> dynamic
    postAddFriendToList:function(username,friendToAdd,callback){
        query= `SELECT name FROM userObject WHERE username='${username}' `
            performQuery(query,function(err,userName){
                if(err) throw err
                console.log(userName)
                query =`SHOW TABLES`;
                performQuery(query,function(err,tables){
                    if(err) throw err;
                    console.log(tables)
                   var userTable= tables.filter((table)=>table.Tables_in_kartik===`${userName[0].name}Friends`);
                    console.log(userTable)
                    if(userTable[0]){
                        query =`INSERT INTO ${userTable[0].Tables_in_kartik} (${userName[0].name}FriendList) VALUES('${friendToAdd}')`;
                        performQuery(query,function(err,sucessStatus){
                            callback(err,sucessStatus)
                        });

                    }else{
                        query = `CREATE TABLE ${userName[0].name}Friends 
                        (${userName[0].name}FriendId INT(100) NOT NULL AUTO_INCREMENT ,
                        ${userName[0].name}FriendList 	VARCHAR(150) NOT NULL UNIQUE,
                        PRIMARY KEY(jacobFriendId)
                       )`;

                       performQuery(query,function(err,createStatus){
                           if(err) throw err;
                           if(err&&createStatus){
                            query =`INSERT INTO ${userName[0].name}Friends('friendList') VALUES(${friendToAdd})`;
                                performQuery(query,function(err,insertStatus){
                                    callback(err,insertStatus)
                                })

                           }
                       })
                    }   
                });
            })
    },
    IsTableExists:function(name,callback){
        query =`SHOW TABLES`;
        performQuery(query,function(err,tables){
            if(!err){
                if(!tables[0]){
                   console.log('nothing match')
                }else {
                    console.log(tables,`${name}Friends`)
                    var requiredtable= tables.filter((table)=>table.Tables_in_kartik===`${name}Friends`)
                    console.log(requiredtable,'hhhh')
                   var tableName = requiredtable[0]?requiredtable[0].Tables_in_kartik:null;
                        callback(tableName)

                    
                }
            }
        })
        
    },
    getName:function(username,callback){
        query=`SELECT name FROM userObject WHERE username='${username}'`;
        performQuery(query,function(err,name){
            console.log(err,name[0].name,'getname')
           callback(name[0].name)
        }) 
    },
    //update token
    //tables userd userObject
    updateToken:function(token,username,callback){
        query=`UPDATE userObject SET token='${token}' WHERE username='${username}'`;
        performQuery(query,function(err,updateStatus){
            callback(err,updateStatus)
        })
    },
    //gettin user info
    check:function(username,callback){
            query =`SELECT * FROM userObject WHERE username='${username}'`;
            performQuery(query,function(err,user){
                callback(err,user);
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

 /* .forEach(table => {   
                        if( table.Tables_in_kartik ===`${usersName}Friends`){
                            


                        } */ 
                                               
                        