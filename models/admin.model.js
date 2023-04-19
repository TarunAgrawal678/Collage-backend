const mongoose= require('mongoose');
const Schema= mongoose.Schema;
const Joi = require("joi");

const schema= new Schema({
    username:{
        type: String,
        required: true,
        unique:true
    },
    name:{
        type: String,
        required: true,
        unique:true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    phoneNumber:{
        type: String,
        required: true,
        unique:true
    },
    hash:{
        type:String,
        required: true
    },
    role:{
        type:String,
        required: true
    }
});

schema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: function (doc,ret){
        delete ret._id;
        delete ret.hash;
    }
});

const Admin = mongoose.model('Admin', schema);
const validate = (admin) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        role:Joi.string().required(),
        name:Joi.string().required()
    });
    return schema.validate(admin);
};
module.exports = { Admin,validate };