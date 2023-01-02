const route = require('express').Router()

const addRemoveStock = require('../controllers/stock/addRemoveStock');
const getStock = require('../controllers/stock/getStock')
const catController = require('../controllers/categories/mainCategory')



// Getting products

route.get('/getProduct/all',getStock.getAllStock);
route.get('/getProduct/stock',getStock.getStock);
route.get('/getProduct/:id',getStock.getSingleProduct);
route.get('/getProduct/category/:category',getStock.getProductByCategory);


// Delete, Edit and Creating

route.post('/addProduct',addRemoveStock.addProduct);
route.delete('/deleteProduct/:id',addRemoveStock.deleteProduct);
route.post('/editProduct/:id',addRemoveStock.editProduct);



// related to categories

route.post('/addCategory',catController.newCategory);
route.delete('/deleteCategory',catController.DeleteCategory);



module.exports = route
