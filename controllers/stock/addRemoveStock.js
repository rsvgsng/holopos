const itemModel = require('../../models/ItemModel');
const SettingsModel = require('../../models/SettingsModel');
const {ItemUnits}  = require('../../misc/CustomCategories');
const fs = require('fs');

const addProduct = async (req, res) => {
    try {

    

        if(!req.body.ItemName || !req.body.ItemPrice || !req.body.ItemQuantity || !req.body.ItemUnit ||  !req.body.ItemCategory || !req.body.ItemDescription)



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

        var ItemUnit=ItemUnits().ItemUnit
        
        if(!ItemUnit.includes(req.body.ItemUnit)) return res.send({
            status:400,
            message:"Invalid Item Unit"
        })
    
        const newItem =await new itemModel({

        ItemName: req.body.ItemName.toLowerCase(),
        ItemPrice: req.body.ItemPrice,
        ItemQuantity: req.body.ItemQuantity,
        ItemCategory: req.body.ItemCategory,
        ItemDescription: req.body.ItemDescription,
        ItemCode: req.body.ItemCode,
        ItemUnit: req.body.ItemUnit,
        })
        console.log(newItem)
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

   await newItem.save(async (err,data) => {
        if(err) console.log(err)    

        if(err) return res.send({
            status:400,
            message:"Error adding item , Either item name or item code already exists ",
        })
        
        await req.files.ItemImage.mv(`files/ProductImages/${req.body.ItemName.toLowerCase().split(' ').join('')+'.' + req.files.ItemImage.mimetype.split("/")[1]}`)

       await   itemModel.findByIdAndUpdate({_id:newItem._id}, {
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

            await itemModel.findById({_id:req.params.id},async(err,data)=>{
            if(!data){
                return res.status(404).send({
                    status:400,
                    message:"Item does not exist"
                })
            }

            await fs.unlink(`files/ProductImages/${data.ItemImage}`, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
            

            await data.remove()
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


        if(req.files?.ItemImage){    

        
             const checkImage = await itemModel.findById(req.params.id)
            
             if(checkImage.length<1) return res.send({
                status:400,
                message:"Item does not exist"
             })
                 if(!req.files.ItemImage.mimetype.startsWith('image/'))  
            
            return res.send({

                status:400,
                message:"Please upload an image"
            
            })
            

            // remove the old image
            await  fs.unlink(`files/ProductImages/${checkImage.ItemImage}`, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })

            // upload the new image
            await req.files.ItemImage.mv(`files/ProductImages/${req.body.ItemName.toLowerCase().split(' ').join('')+'.' + req.files.ItemImage.mimetype.split("/")[1]}`)

            await itemModel.findByIdAndUpdate({_id:req.params.id}, {
                ItemImage:`${req.body.ItemName.toLowerCase().split(' ').join('')+'.' + req.files.ItemImage.mimetype.split("/")[1]}`
            })

        

            if(req.files.ItemImage.size>(parseInt(process.env.MAX_IMAGE_SIZE )|| 2000000 )) return res.send({
             
                status:400,
                message:`Image size should not exceed ${Math.round(process.env.MAX_IMAGE_SIZE/(1024*1024))|| Math.round(2000000/(1024*1024))} MB`
            
            })





        }




         // checks if the category exists
         if(req.body.ItemCategory){
            dupCat = await SettingsModel.find({ _id: process.env.CATEGORY_DB_ID }).select('Categories')

            if (!dupCat[0].Categories.includes(req.body?.ItemCategory.toLowerCase())) {
                return res.status(400).send({
                    message: "Category doesnot already exists",
                    code: 400
                })
            }
         }
     
 



         await itemModel.findByIdAndUpdate({_id:req.params.id},{
        
            ItemName: req.body.ItemName,
            ItemPrice: req.body.ItemPrice,
            ItemQuantity: req.body.ItemQuantity,
            ItemCategory: req.body.ItemCategory,
            ItemDescription: req.body.ItemDescription,
            ItemCode: req.body.ItemCode,
            ItemUnit: req.body.ItemUnit,
        
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
        console.log(e)
       res.status(500).send({
            status:500,
            message:"Something Went Wrong or the Item does not exist"
        })
    }
}




module.exports = {
    addProduct,
    deleteProduct,
    editProduct
}