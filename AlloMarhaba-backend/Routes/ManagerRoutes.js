const express = require('express')
const router = express.Router();
const{ createMenuItem ,getMenuItems , getMenuItem , updateMenuItem , updateMenuImage } = require('../Controllers/manager/MenuController');
const validationMenu = require('../Utils/validationMenu')
    

router.post('/addMenu', validationMenu,createMenuItem)
router.get('/showMenus',getMenuItems)
router.post('/showMenu',getMenuItem)

router.post('/updateMenu/:id',updateMenuItem)
router.post('/updateMenuImage/:id',updateMenuImage)



module.exports = router


