const SettingModel = require('../../models/SettingsModel')

const newCategory = async (req, res) => {
    try{
        // checking if category already exists

        dupCat =   await SettingModel.find({_id:process.env.CATEGORY_DB_ID}).select('Categories')
        if(dupCat[0].Categories.includes(req.body.category)){
            return res.status(400).send({
                message:"Category already exists",
                code:400
            })
        }

    
    await SettingModel.findById(process.env.CATEGORY_DB_ID).select('Categories')
    .then(async (data) => {

        let categories = data.Categories

        categories.push(req.body.category.toLowerCase())
         SettingModel.findByIdAndUpdate(process.env.CATEGORY_DB_ID,{
            Categories:categories

        })
        .then(() => {
            res.status(200).json({
                message:"Category added successfully"
            })
        })
    })



}catch(e){
    
    res.status(500).send({
        message:"Something went wrong"
    })
    
}


}


module.exports ={
    newCategory
}