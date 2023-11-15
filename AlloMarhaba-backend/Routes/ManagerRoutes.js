const express = require('express')
const uploadfile = require('../Utils/multer');
const router = express.Router();
const{ createMenuItem} = require('../Controllers/MenuController');
    

router.post('/addMenu',uploadfile,createMenuItem)

module.exports = router


