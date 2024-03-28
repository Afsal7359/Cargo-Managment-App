const Area = require("../Models/Area");

module.exports={

AddArea: async (req,res)=>{
    try {
        const data = req.body;
        console.log(data,"data");
        const existingArea= await Area.findOne({ $or: [{ name: data.name}],})
        if(existingArea !== null){
            return res.status(404).json({
                success: false,
                message: "Area already exist ."
              });
        }else{
            const newArea = new  Area(data);
            await newArea.save();
            res.status(200).json({
                success:true,
                message:"Area Added Successfully",
                data:newArea
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:error
        })
    }
},
GetArea:async (req,res)=>{
    try {
        const AreaData = await Area.find({ isdeleted: {$ne:true}})
        if(!AreaData){
            return res.status(404).json({
                success:false,
                message:"No Data Found"
            })
        }
        res.status(200).json({
            success: true,
            data: AreaData,
          });
    }catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:error
        })
    }
}
}