const express = require("express");
const Area = require("../controller/Area");
const router = express.Router();

router.post('/add',Area.AddArea);
router.get('/get',Area.GetArea);

module.exports =router;