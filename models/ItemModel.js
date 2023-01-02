const { Schema, model } = require('mongoose')

const itemModel = new Schema({
    ItemName: {
        type: String,
        required: true,
    },
    ItemPrice: {
        type: Number,
        required: true,

    },
    ItemQuantity: {
        type: Number,
        required: true,

    },
    ItemImage:{
        type:String,
        required:true,
        default:"https://www.chanchao.com.tw/images/default.jpg",
    },
    ItemCategory: {
        type: String,
        required: true,

    },
    ItemDescription: {
        type: String,
        required: true,
    },
    dateAdded:{
        type:Date,
        default:Date.now()
        
    }


})


module.exports = model('products', itemModel)
