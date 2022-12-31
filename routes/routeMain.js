const route = require('express').Router()

const addStock = require('../controllers/stock/addStock');
const getStock = require('../controllers/stock/getStock')
const deleteItem =require('../controllers/stock/deleteItem')


route.get('/getProduct/all',getStock.getAllStock);
route.get('/getProduct/:id',getStock.getSingleProduct);

route.post('/addProduct',addStock);
route.delete('/deleteProduct/:id',deleteItem);


module.exports = route
