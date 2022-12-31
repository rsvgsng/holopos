const ItemModel = require("../../models/ItemModel")

const getStock = async (req,res)=>{
try {
    

    console.log("hu")
    ItemModel.find({},(err,data)=>{
        if(err){
            return res.send(err)
        }
        return res.send(data)
    }).select("-_id -__v")



} catch (error) {
    res.send(error)
}
    



}
module.exports = getStock