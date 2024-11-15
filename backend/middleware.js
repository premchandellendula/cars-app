// const jwt = require('jsonwebtoken');
const { jwtVerify } = require('jose');
const { JWT_SECRET } = require('./config');

async function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            error: "Authorization error"
        })
    }

    const token = authHeader.split(' ')[1];
    const secretKey = new TextEncoder().encode(JWT_SECRET);
    
    try{
        const { payload } = await jwtVerify(token, secretKey);

        if(payload.userId){
            req.userId = payload.userId;
            next();
        }else{
            return res.status(403).json({
                error: "Unauthorized - User ID not found in token"
            })
        }
    }catch(err){
        console.error('JWT error:', err);  
        return res.status(403).json({
            message: "Unauthorized - Invalid or expired token"
        });
    }
}

module.exports = {
    authMiddleware
}