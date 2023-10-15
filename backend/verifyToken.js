const jwt=require('jsonwebtoken')
var express = require('express');
var app = express();
var cookies = require("cookie-parser");

app.use(cookies());

const verifyToken=(req,res,next)=>{
    // console.log(req.headers.authorization)
    
    // const token=req.cookies.token;       // 1st methodto access cookie
    // const tokenValue = req.headers.cookie.split("=")[1];    // 2nd method (doing another way bcoz of deployment problem)
    
    const token=req.headers.authorization;          // 3rd method (finally lol)
    console.log(token);


    if(!token){
        return res.status(401).json("You are not authenticated!")
    }
    jwt.verify(token,process.env.SECRET,async (err,data)=>{
        if(err){
            return res.status(403).json("token is not valid!")
        }
        // console.log(data);
        req.userId=data._id
        // console.log(req.usedId);
       
        // console.log("passed")
        
        next()
    })
}

module.exports=verifyToken