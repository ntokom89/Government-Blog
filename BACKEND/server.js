const http = require('https');
const app = require('./app');
const fs = require('fs');
const PORT = 3000

//https://medium.com/@limzykenneth/self-sign-certificate-for-advanced-web-development-7c95edba678b
//Creating the server using key and certificate.
const server = http.createServer({
    key: fs.readFileSync('keys/server.key'),
    cert: fs.readFileSync('keys/server.crt')
}, app); 


server.listen(PORT)