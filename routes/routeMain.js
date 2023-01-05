const route = require('express').Router()

const addRemoveStock = require('../controllers/stock/addRemoveStock');
const getStock = require('../controllers/stock/getStock')
const catController = require('../controllers/categories/mainCategory')
const ExpensesController = require('../controllers/expenses/ExpensesController')
const SalesController = require('../controllers/sales/SalesController')

// Getting products

route.get('/getProduct/all',getStock.getAllStock);
route.get('/getProduct/stock',getStock.getStock);
route.get('/getProduct/nostock',getStock.getOutofStock);
route.get('/getProduct/:id',getStock.getSingleProduct);
route.get('/getProduct/:id',getStock.getSingleProduct);
route.get('/getProduct/code/:code',getStock.getSingleProductByCode);
route.get('/getProduct/category/:category',getStock.getProductByCategory);


// Delete, Edit and Creating

route.post('/addProduct',addRemoveStock.addProduct);
route.delete('/deleteProduct/:id',addRemoveStock.deleteProduct);
route.post('/edit/product/:id',addRemoveStock.editProduct);

// Purchases Page
route.post('/create/expenses',ExpensesController.CreateExpenses);
route.post('/edit/expenses/:id',ExpensesController.EditExpenses);

// Sales Related
route.post('/create/sale',SalesController.CreateSale);


// related to categories

route.post('/addCategory',catController.newCategory);
route.delete('/deleteCategory',catController.DeleteCategory);



module.exports = route
