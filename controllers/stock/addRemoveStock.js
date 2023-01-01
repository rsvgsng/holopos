const itemModel = require('../../models/ItemModel');
const SettingsModel = require('../../models/SettingsModel');

const addProduct = async (req, res) => {
    try {
        if(!req.body.ItemName || !req.body.ItemPrice || !req.body.ItemQuantity || !req.body.ItemCategory || !req.body.ItemDescription)
        return res.send({
            status:400,
            message:"Please fill all the fields"

        })

        const newItem =await new itemModel({
        ItemName: req.body.ItemName,
        ItemPrice: req.body.ItemPrice,
        ItemQuantity: req.body.ItemQuantity,
        ItemCategory: req.body.ItemCategory,
        ItemDescription: req.body.ItemDescription
    })
  
    // checks if the category exists
    const category = await SettingsModel.find({Categories:req.body.ItemCategory})
    
   if(category.length<1) return res.send ({
        status:400,
        message:"Category name is invalid"
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
        res.status(500) 
    }

}


const deleteProduct =  async(req, res) => {

    try{

            await itemModel.findById({_id:req.params.id},(err,data)=>{
            if(!data){
                return res.status(404).send({
                    status:400,
                    message:"Item does not exist"
                })
            }
            data.remove()
            return res.status(200).send({
                status:200,
                message:"Item deleted successfully"
            })
        })
        }
    
        
        catch{
          return  res.status(500)
        }



}


const editProduct = async (req, res) => {
    try{
         // checks if the category exists
        const category = await SettingsModel.find({Categories:req.body.ItemCategory})
        if(category.length<1) return res.status(400).send ({
         status:400,
         message:"Category name is invalid"
        })

         await itemModel.findByIdAndUpdate({_id:req.params.id},{
            ItemName: req.body.ItemName,
            ItemPrice: req.body.ItemPrice,
            ItemQuantity: req.body.ItemQuantity,
            ItemCategory: req.body.ItemCategory,
            ItemDescription: req.body.ItemDescription
        }).then((data)=>{
            if(!data){
                return res.status(404).send({
                    status:400,
                    message:"Item does not exist"
                })
            }
            return res.status(200).send({
                status:200,
                message:"Item updated successfully"
            })
        })


    }catch(e){
       res.status(500).send({
            status:500,
            message:"Something Went Wrong"
        })
    }
}




module.exports = {
    addProduct,
    deleteProduct,
    editProduct
}