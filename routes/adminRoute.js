const Admin= require('../model/admin');
const express= require('express');
const route= express.Router();

route.post('/save', async (req,res)=>{
    const adminBody=new Admin({
        username:req.body.username,
        password:req.body.password
    })
    try{
        const dataToSave= await adminBody.save();
        res.status(200).json(dataToSave);
    }catch(error){
        res.status(400).json({message:error.message});
    }
});

route.post('/login',async (req,res)=>{
    try{
        const user= await Admin.findOne({username:req.body.username});
        if(user){
            if(user.password===req.body.password){
                res.status(200).json({message:'Logged in successfully!'});
            }else{
                res.status(400).json({message:'Password does not match!'});
            }
        }else{
            res.status(400).json({message:'User not found'});
        }
    }catch(error){
        res.status(400).json({message:error.message});
    }
})

module.exports=route;