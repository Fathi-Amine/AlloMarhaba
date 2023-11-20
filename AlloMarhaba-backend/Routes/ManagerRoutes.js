const express = require('express')
const uploadfile = require('../Utils/multer');
const router = express.Router();
const{ createMenuItem ,getMenuItems , updateMenuItem , updateMenuImage } = require('../Controllers/manager/MenuController');
const validationMenu = require('../Utils/validationMenu')
    

router.post('/addMenu',validationMenu,uploadfile,createMenuItem)
router.get('/showMenu',getMenuItems)
router.post('/updateMenu/:id',updateMenuItem)
router.post('/updateMenuImage/:id',uploadfile ,updateMenuImage)



module.exports = router


