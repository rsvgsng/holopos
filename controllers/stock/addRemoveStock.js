const itemModel = require('../../models/ItemModel');
const SettingsModel = require('../../models/SettingsModel');


const addProduct = async (req, res) => {
    try {

        // some basic validations

        if(!req.body.ItemName || !req.body.ItemPrice || !req.body.ItemQuantity || !req.body.ItemCategory || !req.body.ItemDescription)
        return res.send({
            status:400,
            message:"Please fill all the fields"

        })
        
        if(req.body.ItemName.length>(process.env.ITEM_NAME_LENGTH || 200)  ) return res.send({
            status:400,
            message:`Item name is too long. Should be less than ${process.env.ITEM_NAME_LENGTH || 200} characters`
        })

        if(parseInt(req.body.ItemPrice)>(process.env.MAX_ITEMPRICE || 10000000 ) ) return res.send({
            status:400,
            message:`Item price should not exceed ${process.env.MAX_ITEMPRICE || 10000000}`
        })

        if(!req.files || !req.files.ItemImage) return res.send({
            status:400,
            message:"Please upload product image",
        })

        if(!req.files.ItemImage.mimetype.startsWith('image/'))  
        return res.send({
            status:400,
            message:"Please upload an image"
        })
        
        if(req.files.ItemImage.size>(parseInt(process.env.MAX_IMAGE_SIZE )|| 2000000 )) return res.send({
            status:400,
            message:`Image size should not exceed ${Math.round(process.env.MAX_IMAGE_SIZE/(1024*1024))|| Math.round(2000000/(1024*1024))} MB`
        })

        if(parseInt(req.body.ItemQuantity)>(process.env.MAX_QUANTITY || 10000)) return res.send({
            status:400,
            message:`Items Quantity should not exceed ${process.env.MAX_QUANTITY || 10000}`
        
        })

        const newItem =await new itemModel({

        ItemName: req.body.ItemName.toLowerCase(),
        ItemPrice: req.body.ItemPrice,
        ItemQuantity: req.body.ItemQuantity,
        ItemCategory: req.body.ItemCategory,
        ItemDescription: req.body.ItemDescription

        })
  
    // checks if the category exists

   const category = await SettingsModel.find({Categories:req.body.ItemCategory.toLowerCase()})
    
  const dupProduct = await itemModel.find({ItemName:req.body.ItemName.toLowerCase()})
  
    if(dupProduct.length>0) return res.send({
        status:400,
        message:"Item already exists"
    })
    
   if(category.length<1) return res.send ({
        status:400,
        message:"Category name is invalid"
   })

    await newItem.save(async (err) => {
        // check image size 
       await req.files.ItemImage.mv(`files/ProductImages/${req.body.ItemName.toLowerCase().split(' ').join('')+'.' + req.files.ItemImage.mimetype.split("/")[1]}`)

       await    itemModel.findByIdAndUpdate({_id:newItem._id}, {
            ItemImage:`${req.body.ItemName.toLowerCase().split(' ').join('')+'.' + req.files.ItemImage.mimetype.split("/")[1]}`
        })

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