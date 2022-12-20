const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var ExpressBrute = require('express-brute');
var helmet = require('helmet')

var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
var bruteforce = new ExpressBrute(store);

//https://www.bezkoder.com/mean-stack-authentication-angular-8/
//router statement to sign up the user to the database for website
router.post('/signup',bruteforce.prevent, (req, res) => {
    bcrypt.hash(req.body.password,10)
    .then(hash => {
        const user = new User({
            username: req.body.username,
            password: hash
        });
        user.save()
        .then(result => {
            res.status(201).json({
                message: 'User created',
                result: result
            })
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        })
    }) 
})

//https://www.bezkoder.com/mean-stack-authentication-angular-8/
//https://www.agiratech.com/authentication-in-mean-stack-a-quick-guide
//A router statement to login the user with unername and password
router.post('/login', bruteforce.prevent, (req, res) => {
    let fetchedUser;
    User.findOne({username: req.body.username})
    .then(user =>{

        if(!user){
            return res.status(401).json({
                message: "authetication failure"
            })
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password,user.password);
    })
    .then(result => {
        if(!result){
            return res.status(401).json({message: "Authentication Failure"})
        }

        const token = jwt.sign({username:fetchedUser.username, userid: fetchedUser._id}, 
            'secret_this_should_be_longer_than_it_is', {expiresIn: '1h'});
            res.status(200).json({
                token: token,
                message: 'Sucessfully login'
                //result: string = 'Login Success'
            });
    })
    .catch(err => {
        return res.status(401).json({
            message: "Authentication failure"
        })
    })
})

module.exports = router