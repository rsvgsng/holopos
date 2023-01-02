const { Schema, model } = require('mongoose')

const itemModel = new Schema({
    Categories:[{
        type: Array,
        required: true,
        unique: true
    }],
    Theme:{
        type: String,
        default: "light",
        
        
    }
    

})


module.exports = model('settings', itemModel)
