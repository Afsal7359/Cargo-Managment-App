const mongoose = require('mongoose');

const ProductSchema= new mongoose.Schema({
   
    id:{
        type: String,
        require:true,
        trim:true
    },
    name:{
        type: String,
        require:true,
        trim:true
    },
    price:{
        type:String,
        require:true,
        trim:true
    },
    image:{
        type:String,
        trim:true
    },
    stock:{
        type: String,
        trim:true
    },
    isdeleted:{
        type:Boolean,
        require:true,
        default:false
    }
   

})
const Products = mongoose.model('Products',ProductSchema);
module.exports=Products;