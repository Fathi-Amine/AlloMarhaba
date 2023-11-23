const express = require('express')
const router = express.Router();
const{ createMenuItem ,getMenuItems , getMenuItem , updateMenuItem , updateMenuImage ,deleteMenuItem } = require('../Controllers/manager/MenuController');
const validationMenu = require('../Utils/validationMenu')
    

router.post('/addMenu', validationMenu,createMenuItem)
router.get('/showMenus',getMenuItems)
router.post('/showMenu',getMenuItem)

router.post('/updateMenu',updateMenuItem)
router.post('/deleteMenu',deleteMenuItem)




module.exports = router


