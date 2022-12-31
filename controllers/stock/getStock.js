const ItemModel = require("../../models/ItemModel")
const SettingsModel = require("../../models/SettingsModel")


const getAllStock = async (req, res) => {
    try {
        const items = await ItemModel.find({})
        
        res.send(items)    


    } catch (error) {
        res.status(500)
    }

}
const getSingleProduct = async (req, res) => {
    try {
        const items = await ItemModel.findById(req.params.id)
        if(!items) return res.send({
            status:404,
            message:"Item not found"
        })
      return  res.send(items)    
        

    } catch (error) {
        res.status(404).send({
            status:404,
            message:"Item not found or something went wrong"
        })
    }

}



module.exports = {
    getAllStock,
    getSingleProduct


}