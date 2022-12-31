const itemModel = require('../../models/ItemModel');
const addStock = async (req, res) => {
console.log(req.body)
    try {
        const newItem =await  new itemModel({
        ItemName: req.body.name,
        ItemPrice: req.body.price,
        ItemQuantity: req.body.quantity,
        ItemCategory: req.body.category,
        ItemDescription: req.body.description
    })
  


    await newItem.save(async (err) => {
        if (err) {
            await res.send({
                status: 400,
                message: "Item already exists",
                data: err
            })
        }
        await  res.send({
            status: 200,
            message: "Item added successfully",
        })
    })




    }
    
    catch (error) {
        
       console.log(error)


    }



    
}

module.exports = addStock