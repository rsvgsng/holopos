const route = require('express').Router()

const addRemoveStock = require('../controllers/stock/addRemoveStock');
const getStock = require('../controllers/stock/getStock')
const deleteItem =require('../controllers/stock/deleteItem')




// Getting products

route.get('/getProduct/all',getStock.getAllStock);
route.get('/getProduct/stock',getStock.getStock);
route.get('/getProduct/:id',getStock.getSingleProduct);
route.get('/getProduct/category/:category',getStock.getProductByCategory);


// Delete, Edit and Creating

route.post('/addProduct',addRemoveStock.addProduct);
route.delete('/deleteProduct/:id',addRemoveStock.deleteProduct);





module.exports = route
