
const shop = require("../Models/Shop");

module.exports={
    
    AddShop: async (req, res) => {
        try {
            const data = req.body;  // Move this line up
            console.log(data);     // Now log data after it's defined
    
            const existingShop = await shop.find({ $or: [{ name: data.name }] })
    
            if (existingShop.length > 0) {
                return res.status(404).json({
                    success: false,
                    message: "This Shop is already exist",
                });
            } else {
                const newShop = new shop(data);
                await newShop.save();
                res.status(200).json({
                    success: true,
                    message: "Shop has been added successfully!",
                    data: newShop,
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    
    GetShop: async(req,res)=>{
        try {
            const shopData = await shop.find({isdeleted: {$ne:true}})
            if(!shopData){
                return res.status(404).json({
                    success:false,
                    message:"No Data Found"
                })
            }res.status(200).json({
                success: true,
                message:"Shop Data fetched Successfully",
                data: shopData,
              });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success:false,
                message:error
            })
        }
    }
}