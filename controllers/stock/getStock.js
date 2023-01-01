const ItemModel = require("../../models/ItemModel")


const getAllStock = async (req, res) => {
    try {
        const items = await ItemModel.find({})
        
        res.send(items)    


    } catch (error) {
        res.status(500)
    }

}



const getStock = async (req, res) => {
    try {
            const items = await ItemModel.find({
                ItemQuantity: {
                    $gt: 0,
                }
            })
         return   res.send(items)

    } catch (error) {
       return res.status(500)
        
    }
}


const getSingleProduct = async (req, res) => {
    try {
        const items = await ItemModel.findById(req.params.id)
        if(!items) return res.send({
            status:404,
            message:"Invalid Query or Item not found"
        })
      return  res.send(items)    
        

    } catch (error) {
        res.status(404).send({
            status:404,
            message:"Something went wrong"
        })
    }

}

const getProductByCategory = async (req, res) => {
    try {
        const items = await ItemModel.find({
            ItemCategory: req.params.category
        })
        if(items.length<1) return res.send({
            status:404,
            message:`No items available in "${req.params.category}" category`
        })

      return  res.send(items)    
        

    } catch (error) {
        res.status(404).send({
            status:404,
            message:"Something went wrong"
        })
    }
}




module.exports = {
    getAllStock,
    getSingleProduct,
    getStock,
    getProductByCategory


}