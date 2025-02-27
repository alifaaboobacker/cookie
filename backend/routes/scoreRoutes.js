const express = require('express');
const scoreController = require('../controller/ScoreController')

const router = express.Router();

router.get('/gift',scoreController.getGiftsController);
router.post('/add',scoreController.addScoreController);


module.exports=router;