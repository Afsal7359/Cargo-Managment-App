const mongoose= require("mongoose");


const OrderSchema = new mongoose.Schema({
    shop:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'shop'
    },
    date:{
        type:String,
        trim:true
    },
    cartitem: {
        type: [{
            id: {
                type: mongoose.Schema.Types.Mixed,
                default:null
            },
            products: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products',
            },
            quantity: {
                type: String,
            },
            price: {
                type: String,
            },
        }],  
        default: [] 
    },
    totalprice:{
        type:String,
        trim:true
    },
    isdeleted:{
        type:Boolean,
        require:true,
        default:false
    }
})
const  Order = mongoose.model('Order', OrderSchema);
module.exports=Order;