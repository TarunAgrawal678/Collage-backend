const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const schema= new Schema({
    username:{
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
module.exports = mongoose.model('Admin', schema);