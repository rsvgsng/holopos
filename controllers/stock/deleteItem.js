const itemModel = require('../../models/ItemModel');
const deleteItem =  async(req, res) => {

        try{

                await itemModel.findById({_id:req.params.id},(err,data)=>{
                if(!data){
                    return res.status(404).send({
                        status:400,
                        message:"Item does not exist"
                    })
                }
                data.remove()
                return res.send({
                    status:200,
                    message:"Item deleted successfully"
                })
            })
            }
        
            
            catch{
                res.status(500)
            }



}
module.exports = deleteItem