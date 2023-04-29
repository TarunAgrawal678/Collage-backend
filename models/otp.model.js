const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const schema= new Schema({
    id: {
        type: Number
        // required: true
    },
    otp: {
        type:String
    },
    expiration_time:{
        type:Date
    },
    verified: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        allowNull: false,
        default: new Date().toISOString()
    },
    updated_at: {
        type: Date,
        allowNull: false,
        defaultValue: new Date().toISOString()
    }
});
const OTP = mongoose.model('OTP', schema);
module.exports = OTP;