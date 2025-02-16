
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validation =asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader = req.headers.authorization 
    console.log("auth header",authHeader)
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        console.log("token",token)
        jwt.verify(token,process.env.ACCES_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                console.log("eroorrrr",err)
                res.status(401);
                throw new Error("User is not authorized")
            }
            req.user = decoded.user;
            next()
        })
        if(!token){
            res.status(401);
                throw new Error("User is not authorized or token is missing")
        }
    }
})

module.exports= validation