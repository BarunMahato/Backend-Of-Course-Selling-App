const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET  = process.env.JWT_ADMIN_SECRET;

function adminMiddleware( req, res, next){
    const token = req.headers.token;
    const response = jwt.verify(token, JWT_SECRET);
    if(response){
        req.userId = response.userId;
        next();
    }else{
        res.status(403).json({
            message: "The id didnot match."
        })
    }   
}

module.exports = {
    adminMiddleware
}