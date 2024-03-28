const mongoose = require('mongoose')

const ShopSchema = new mongoose.Schema({
    id:{
        type:String,
        trim:true
    },
    name:{
        type:String,
        trim:true,
    },
    area:{
        type:String,
        trim:true,
    },
    district:{
        type:String,
        trim:true,
    },
    address:{
        type:String,
        trim:true
    },
    phone:{
        type:String,
        trim:true
    },
    pincode:{
        type:String,
        trim:true
    },
    company:{
        type:String,
        trim:true
    },
    isdeleted:{
        type:Boolean,
        require:true,
        default:false,
    }

});
const shop = mongoose.model('shop',ShopSchema)
module.exports=shop;