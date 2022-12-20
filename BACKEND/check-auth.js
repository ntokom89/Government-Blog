const jwt = require('jsonwebtoken')

//https://www.bezkoder.com/mean-stack-authentication-angular-8/
module.exports =(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,"secret_this_should_be_longer_than_it_is")
        next();
    }
    catch (err) {
        res.status(401).json({message: 'Invalid token'
    })
    }
}