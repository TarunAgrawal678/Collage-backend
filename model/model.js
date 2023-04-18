const mongoose=require('mongoose');

const dataSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    age:{
        type: Number,
        require: true
    }
});

module.exports = mongoose.model('Data', dataSchema);