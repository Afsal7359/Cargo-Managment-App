const mongoose = require('mongoose');

const AreaSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
    },
    district:{
        type:String,
        trim:true,
    },
    isdeleted:{
        type:Boolean,
        require:true,
        default:false
    }
});
const Area = mongoose.model('Area',AreaSchema);
module.exports=Area