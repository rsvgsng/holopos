const { Schema, model } = require('mongoose')

const ExpensesModel = new Schema({
    ExpensesName: {
        type: String,
        required: true,
    },
    ExpensesAmount: {
        type: Number,
        required: true,

    },
    ExpensesCategory: {
        type: String,
        required: true,
    },
    ExpensesDescription: {
        type: String,
        required: true,

    },
    ExpensesDate: {
        type: Date,
        required: true,
    },


})



module.exports = model('expenses', ExpensesModel)