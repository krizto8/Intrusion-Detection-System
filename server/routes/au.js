const express=require("express");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const User=require("../models/User.js");
const router=express.Router();
const au=require('../middlewares/autoken.js');

router.post("/register",async(req,res)=>{
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({msg:"User already exists"});
        }
        user=new User({
            email,
            password:await bcrypt.hash(password,10),
        });
        await user.save();
        res.status(201).json({msg:"User registered successfully"});
    }catch(err){
        res.status(500).json({msg:"Server Error"});
    }
});

router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:"Invalid Credentials"});
        }
        const ismatch=await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.status(400).json({msg:"Invalid Credentials"});
        }
        const payload={userId:user._id};
        jwt.sign(payload,'secret',{expiresIn:'1h'},(err,token)=>{
            if(err){
                throw err;
            }
            res.json({token});
        })
    }
    catch(err){
        res.status(500).json({msg:"Server error"});
    }
})

router.get('/me',au,async(req,res)=>{
    try{
        const user=await User.findById(req.user).select('-password');
        res.json(user);
    }
    catch(err){
        res.status(500).json({msg:"Server Error"});
    }
})

module.exports=router;