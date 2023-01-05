const { Schema, model } = require('mongoose')





const SalesModel = new Schema({
    Items:{
        type: Array,
        required: true
        
    },
    TotalPrice: {
        type: Number,
        required: true

    },
    date: {
        type: Date,
        default: Date.now
    }
})





module.exports = model('Sales', SalesModel)




        // {
        //     "message": "Sale Created",
        //     "status": 200,
        //     "TotalPrice": 546,
        //     "Items": [
        //         {
        //             "coke": [
        //                 {
        //                     "price": 897,
        //                     "quantity": 6
        //                 }
        //             ],
        //             "Sprite": [
        //                 {
        //                     "price": 897,
        //                     "quantity": 10
        //                 }
        //             ],
        //             "Khukuri Ciggrates": [
        //                 {
        //                     "price": 100,
        //                     "quantity": 10
        //                 }
        //             ]
        //         }
        //     ]
        // }