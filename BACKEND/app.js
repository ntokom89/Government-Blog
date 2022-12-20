const express = require('express');
const app = express();
const urlprefix = '/api';
const mongoose = require('mongoose');
const Post = require('./models/Post')
const fs = require('fs');
const cert = fs.readFileSync('keys/certificate.pem')
const options = {
    server: {sslCA: cert}
};
var helmet = require('helmet')
var morgan = require('morgan')

const constring = 'mongodb+srv://ntokozo:laQhX13oi6rDoAE0@cluster0.qefe1ve.mongodb.net/?retryWrites=true&w=majority'
//const constring = 'mongodb://localhost:27017'

const postRoutes = require("./routes/Post");
const userRoutes = require("./routes/User")

//Use moongoose to connect to database
//https://www.dotnettricks.com/learn/angularmaterial/datatable-crud-operations-mean-stack
mongoose.connect(constring)
.then(() => 
{
console.log('Connected')
}).catch(() => {
  console.log('Failed to connect')  
}, options);

app.use(express.json())
//Method to use morgan 
app.use(morgan('combined'))
//Method to use helmet js.
//https://www.securecoding.com/blog/using-helmetjs/
app.use(helmet());
//Method to use dns prefetch controls and help improve user privacy
//https://www.securecoding.com/blog/using-helmetjs/#X-DNS-Prefetch-Control
app.use(helmet.dnsPrefetchControl({
  allow: true,
}));
//Method to remove X-Powered by browser which hackers can use to get valuable infromation information
//https://www.securecoding.com/blog/using-helmetjs/#X-DNS-Prefetch-Control
app.use(helmet.hidePoweredBy());
///Method to tell the browser to prefer HTTPS over HTTP
//https://www.securecoding.com/blog/using-helmetjs/#X-DNS-Prefetch-Control
app.use(
  helmet.hsts({
    maxAge: 15552000,
    includeSubDomains: false,
  })
 );
//https://soshace.com/implementing-role-based-access-control-in-a-node-js-application/
//https://www.geeksforgeeks.org/node-js-response-setheader-method/
app.use((reg,res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
  res.setHeader('Access-Control-Allow-Methods', '*')
  next();
})



app.get(urlprefix +'/',(req,res) =>{
    
})

app.use(urlprefix +'/posts',postRoutes)
app.use(urlprefix +'/users',userRoutes)
module.exports = app;
