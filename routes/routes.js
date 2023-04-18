const express=require('express');
const Model =require('../model/model');
const route=express.Router();

route.post('/save',async (req,res)=>{
    const data= new Model({
        name: req.body.name,
        age: req.body.age
    });
    try{
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }catch(error){
        res.status(400).json({message:error.message});
    }
    res.send('Data saved!');
});

route.get('/getAll',async (req,res)=>{
    try{
        const data= await Model.find();
        res.status(200).json(data);
    }catch(error){
        res.status(400).json({message:error.message});
    }
    res.send('All records!');
});

route.get('/getOne/:id',async (req,res)=>{
    try{
        const data= await Model.findById(req.params.id);
        res.status(200).json(data);
    }catch(error){
        res.status(400).json({message:error.message});
    }
});

route.put('/update/:id',async (req,res)=>{
    try{
        const id=req.params.id;
        const updatedData=req.body;
        const options= {new:true};
        const dataToUpdate= await Model.findByIdAndUpdate(id,updatedData,options);
        res.status(200).json(dataToUpdate);
    }catch(error){
        res.status(400).json({message:error.message});
    }
});

route.delete('/delete/:id',async (req,res)=>{
    try{
        const dataToDelete= await Model.findByIdAndDelete(req.params.id);
        res.send({message: 'Deleted successfully!'});
    }catch(error){
        res.status(400).json({message:error.message});
    }
});

module.exports=route;