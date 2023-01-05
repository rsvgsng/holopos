const CreateSale = async(req,res)=>{

    const {TotalPrice,Items} = req.body



        res.send({
            message: "Sale Created",
            status: 200,
            TotalPrice: TotalPrice,
            Items: Items
        })


}




module.exports = {
    CreateSale
}