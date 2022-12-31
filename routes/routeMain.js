const route = require('express').Router()

const addStock = require('../controllers/stock/addStock');
const getStock = require('../controllers/stock/getStock')



route.get('/getStock',getStock);
route.post('/addStock',addStock);


module.exports = route
