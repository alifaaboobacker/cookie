const express = require('express');
const userController = require('../controller/UserController')

const router = express.Router();

router.post('/add',userController.addUserController)
router.get('/:id',userController.getUserDetailsController);


module.exports=router;