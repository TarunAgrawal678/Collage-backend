const mongoose= require('mongoose');

const dataSchema= new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Admin', dataSchema);