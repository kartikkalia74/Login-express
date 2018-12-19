const http = require('http');
const app = require('./app');
const path = require('path');
const port =5000;
var server = http.createServer(app);


server.listen(port,()=>{
console.log(`listning on ${port} ${path.basename('')}`);
})