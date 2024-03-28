const express = require('express');
const Products = require('../controller/Products');
const upload = require('../Util/Multer');
const router = express.Router();

router.post('/add',upload.single("image"),Products.AddProducts);
router.get('/get',Products.GetAllProduts);
router.get('/search/:query', Products.SearchProducts);


module.exports = router;