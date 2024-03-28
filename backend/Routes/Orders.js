const express = require('express');
const Order = require('../controller/Order');

const router = express.Router();

router.post('/add',Order.AddOrders);
router.get('/get',Order.GetOrders);

module.exports=router