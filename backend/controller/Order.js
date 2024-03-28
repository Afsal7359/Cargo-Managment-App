const Order = require("../Models/Orders");

module.exports={
    AddOrders: async (req,res)=>{
        try {
            const data = req.body;
            console.log(data,"data");
          
                const newOrder = new  Order(data);
                await newOrder.save();
                res.status(200).json({
                    success:true,
                    message:"Order Added Successfully",
                    data:newOrder
                })
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success:false,
                message:error
            })
        }
    },
    GetOrders: async(req,res)=>{
        try {
            const orders = await Order.find({ isdeleted: { $ne: true } })
            .sort({_id:-1})
            .populate('shop')
            .populate('cartitem.products')
            if(!orders){
                return  res.status(404).json({
                    success:false,
                    message:'No orders Found'
                })
            }res.status(200).json({
                success:true,
                message:"Orders Data fetched Successfully",
                data:orders
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success:true,
                message:error
            })
        }
    }
}