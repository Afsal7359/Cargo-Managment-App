const express = require('express');
const Shop = require('../controller/Shop');
const router = express.Router();


router.get('/get',Shop.GetShop);
router.post('/add',Shop.AddShop);

module.exports=router;